import { Server } from "socket.io";

// Create a Socket.IO server
const io = new Server({
  cors: {
    origin: "http://localhost:3000",
  },
});

io.listen(4000);
console.log("Socket.IO server is running on http://localhost:4000");