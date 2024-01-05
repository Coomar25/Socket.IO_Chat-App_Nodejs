const { Server } = require("socket.io");

const io = new Server({
  cors: "http://localhost:5173/",
});

let onlineUsers = [];

io.on("connection", (socket) => {
  console.log("New Connection", socket.id);
  //   listen to connection

  socket.on("addNewUser", (userId) => {
    if (!onlineUsers.some((user) => user.userId === userId)) {
      onlineUsers.push({
        userId,
        socketId: socket.id,
      });
    }
    console.log("Online users data here", onlineUsers);
    io.emit("getOnlineUsers", onlineUsers);
  });

  socket.on("disconnect", () => {
    onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
    io.emit("getOnlineUsers", onlineUsers);
  });

  // Add Messsage
  socket.on("sendMessage", (message) => {
    console.log("in socket received from client", message);
    const user = onlineUsers.find(
      (user) => user.userId === message.recipientId
    );
    console.log("user buddy", user);
    if (user) {
      console.log("from socket send message to client ", message);
      io.to(user.socketId).emit("getMessage", message);
    }
  });
});

io.listen(3000);
