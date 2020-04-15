const express = require("express");
const {
    httpServerAddress: {port, host},
    endPoint
} = require("./etc/config");
const http = require("http");
const socketIo = require("socket.io");
const axios = require("axios");

const app = express();
const winston = require('winston');
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json()
});
if(process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.simple()
    }))
}

const {createProxyMiddleware} = require('http-proxy-middleware');

//app.use(logger);
app.use(express.json());

let iosock;

app.post("/api", (req, res) => {
    let query;

    logger.info("Sending: " + JSON.stringify(req.body));
    iosock.emit("API", req.body);
    res.json("sent");
});

app.post("/hello", createProxyMiddleware({target: endPoint, changeOrigin: true, logLevel: "debug"}));

const server = app.listen(port, host, () => {
    logger.info(`Running Hello Darwin Device API on port ${port}`);
});

// const server = http.createServer(app);
const io = socketIo(server);

// this is bad for production code because it creates a new interval
// for every client. For this demo we only have one client so simple
// over correct in this case
io.on("connection", socket => {
    logger.info("New client connected");
    iosock = socket;
    // setInterval(() => getApiAndEmit(socket), 10000);
    socket.on("disconnect", () => logger.info("Client disconnected"));
});

server.listen(port, () => logger.info(`Listening on port ${port}`));
