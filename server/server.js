let { messageHandler, generateLocationMessage } = require("./utils/message");
let { isRealString } = require("./utils/validation");
let { Users } = require("./utils/users");

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
let users = new Users(); //instances for users

io.on("connection", (socket) => {
  console.log("A new user connected");

  socket.on("join", (params, callback) => {
    if (!isRealString(params.name) || !isRealString(params.room)) {
      return callback("Name and Room Name are Required.");
    }

    socket.join(params.room);
    users.removeUser(socket.id); // remove them from any of the previous room and add them to the new one
    users.addUser(socket.id, params.name, params.room);

    io.to(params.room).emit("updateUserList", users.getUserList(params.room));

    //socket.leave(params.room)
    //io.emit emit to all users --> io.to(params.room).emit
    //socket.broadcast.emit   emit to all users except the one who send it-->> socket.broadcast.to(params.room).emit
    //sokcet.emit    emit to one user socket

    socket.emit(
      "newMessage",
      messageHandler("Admin", "Welcome to the chat room")
    );

    socket.broadcast
      .to(params.room)
      .emit(
        "newMessage",
        messageHandler("Admin", `${params.name} has joined.`)
      );

    callback();
  });

  socket.on("createMessage", (createMessage, callback) => {
    // console.log("create Message:", createMessage);
    let user = users.getUser(socket.id);
    if (user && isRealString(createMessage.text)) {
      io.to(user.room).emit(
        "newMessage",
        messageHandler(user.name, createMessage.text)
      );
    }

    callback();
  });

  socket.on("createLocationMessage", (coords) => {
    let user = users.getUser(socket.id);
    if (user) {
      io.to(user.room).emit(
        "newLocationMessage",
        generateLocationMessage(user.name, coords.latitude, coords.longitude)
      );
    }
  });

  socket.on("disconnect", () => {
    let user = users.removeUser(socket.id);
    if (user) {
      io.to(user.room).emit("updateUserList", users.getUserList(user.room));
      io.to(user.room).emit(
        "newMessage",
        messageHandler("Admin", `${user.name} has left.`)
      );
    }
  });
});

app.use(express.static(PublicPath));
server.listen(port, () => {
  console.log(`app is listening on port : ${port}`);
});
