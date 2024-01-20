import express from "express";
import Server from "socket.io";

const app = express();
const server = new Server(app);

const io = new Server(server);

// io.

app.listen(8080, () => {
  console.log(`server is listening at https://localhost:${8080}`);
});
