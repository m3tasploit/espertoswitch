const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const WebSocket = require("ws");
const events = require("events");
const em = new events.EventEmitter();
app.use(express.json({ limit: "100kb" }));
// app.get("/", (request, response) => {
//   response.send("Hello");
// });
server.listen(80);
const wss = new WebSocket.Server({ server: server, path: "/ws" });

app.post("/api", (req, res) => {
  data = req.body;
  console.log(data);
  res.json({ status: "success" });
  em.emit("sendData");
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

wss.on("connection", ws => {
  console.log("Connected");
  ws.on("message", message => {
    console.log(`received: ${message}`);
  });
  em.on("sendData", () => {
    ws.send(data.cmd);
  });
});
