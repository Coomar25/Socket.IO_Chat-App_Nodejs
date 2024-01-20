import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import cors from "cors";

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5174",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.use(
  cors({
    origin: "http://localhost:5174",
    methods: ["GET", "POST"],
    credentials: true,
  })
);

io.on("connection", (socket) => {
  console.log("User Connected");
  console.log("Socket Id", socket.id);

  socket.emit("welcome", `Welcome to the server ${socket.id}`);
  socket.broadcast.emit("broadcasting", `Broadcasting the event ${socket.id}`);

  //    Listen for a custom event from the client
  socket.on("clientEvent", (data) => {
    console.log(`Received from a client: ${data}`);

    // send a response back to the client
    socket.emit("serverResponse", "Server received your message");
  });
});

const PORT = 8080;

server.listen(PORT, () => {
  console.log(`Server is listening at http://localhost:${PORT}`);
});
