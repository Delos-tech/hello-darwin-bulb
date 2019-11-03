const express = require("express");
const {
  httpServerAddress: { port, host }
} = require("./etc/config");
// const request = require('request');
const logger = require("morgan");
const http = require("http");
const socketIo = require("socket.io");
const axios = require("axios");

const app = express();

app.use(logger("dev"));
app.use(express.json());

let iosock;

app.post("/api", (req, res) => {
  let query;

  console.log("Sending: " + JSON.stringify(req.body));
  iosock.emit("API", req.body);
  res.json("sent");
});

const server = app.listen(port, host, () => {
  console.log(`Running Hello Darwin Device API on port ${port}`);
});

// const server = http.createServer(app);
const io = socketIo(server);

// this is bad for production code because it creates a new interval
// for every client. For this demo we only have one client so simple
// over correct in this case
io.on("connection", socket => {
  console.log("New client connected");
  iosock = socket;
  // setInterval(() => getApiAndEmit(socket), 10000);
  socket.on("disconnect", () => console.log("Client disconnected"));
});

server.listen(port, () => console.log(`Listening on port ${port}`));
