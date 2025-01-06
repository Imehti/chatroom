import { Server } from "socket.io";

const io = new Server({
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("New client connected");

  // Handle message creation
  socket.on("create-something", (payload, callback) => {
    console.log("Received payload:", payload);

    // Broadcast the full payload to all clients
    io.emit("newMessage", payload);

    // Acknowledge the sender
    callback(payload);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

io.listen(4000);
console.log("Socket.IO server is running on http://localhost:4000");
