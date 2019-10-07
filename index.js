const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const WebSocket = require("ws");
const events = require("events");
const em = new events.EventEmitter();

console.log(process.env.PORT);
const port = process.env.PORT || 3000;

app.use(express.json({ limit: "100kb" }));

server.listen(port);
const wss = new WebSocket.Server({ server: server, path: "/ws" });

app.post("/api", (req, res) => {
  throw new Error("BROKEN");
  data = req.body;
  console.log(data);
  res.json({ status: "success" });
  em.emit("sendData");
});

app.get("/", (req, res) => {
  throw new Error("BROKEN");
  res.send("Hello World!");
});

wss.on("connection", ws => {
  console.log("Connected");
  ws.on("message", message => {
    console.log(`received: ${message}`);
  });
  ws.on("close", () => console.log("Client disconnected"));
  em.on("sendData", () => {
    ws.send(data.cmd);
  });
});
