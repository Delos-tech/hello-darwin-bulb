module.exports = {
  httpServerAddress: {
    host: process.env.HTTP_HOST || "localhost",
    port: process.env.HTTP_PORT || 9091
  },
  endPoint: "https://handlers.dwn-iot.com/hello"
};
