import { Server } from "socket.io";

export default function SocketHandler(req, res) {
  const io = new Server(res.socket.server);
  res.socket.server.io = io;

  io.on("connection", (socket) => {
    console.log("Client connected", socket.id);
    socket.on("send-message", (message) => {
      io.emit("receive-message", message);
    });

    res.end();
  });

  return res.json({ message: "ok" });
}

export const config = {
  api: {
    externalResolver: true,
  },
};
