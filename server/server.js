// console.log(__dirname + "/../public");
let path = require("path");
let http = require("http");
let socketIO = require("socket.io");
let PublicPath = path.join(__dirname, "/../public");
// console.log(PublicPath);
let express = require("express");
let app = express();
let port = process.env.PORT || 3000;
let server = http.createServer(app);
let io = socketIO(server);

io.on("connection", (socket) => {
  console.log("A new user connected");

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

app.use(express.static(PublicPath));
server.listen(port, () => {
  console.log(`app is listening on port : ${port}`);
});
