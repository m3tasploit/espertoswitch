import express, { json } from "express";
import { createServer } from "http";
import { Server } from "ws";
import { EventEmitter } from "events";
const app = express();
const server = createServer(app);
console.log(process.env.PORT);
const port = process.env.PORT || 80;
const em = new EventEmitter();
app.use(json({ limit: "100kb" }));
// app.get("/", (request, response) => {
//   response.send("Hello");
// });
server.listen(port);
const wss = new Server({ server: server, path: "/ws" });

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
