const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("joinRoom", ({ storyId }) => {
    socket.join(storyId);
  });

  socket.on("storyUpdate", ({ storyId, content }) => {
    // Broadcast the updated content to all readers
    io.to(storyId).emit("storyUpdate", { content });

    // Save the content to the database (pseudo code)
   // saveStoryContentToDB(storyId, content);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
