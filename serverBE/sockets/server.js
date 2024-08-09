const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve the static files from the React app
app.use(express.static("client/build"));

io.on("connection", (socket) => {
  console.log("New client connected");

  // Handle incoming live writing data
  socket.on("writing", (data) => {
    io.emit("writing", data);
  });

  // Handle incoming comments
  socket.on("comment", (data) => {
    io.emit("comment", data);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`Server running on port ${port}`));
