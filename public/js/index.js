let socket = io();
socket.on("connect", function () {
  console.log("connected to server");
});

// socket.on("newAdminMs", function (AdminMs) {
//   console.log(AdminMs);
// });

// socket.on("userJoined", function (userMs) {
//   console.log(userMs);
// });

socket.emit("createEmail", {
  to: "memo@yahoo.com",
  text: "Hello world this is the custom event sent from the client to the server",
});

// socket.emit("createMessage", {
//   from: "jen",
//   text: "hello what are you doing today",
// });

socket.on("newMessage", function (newMessage) {
  console.log("new Message", newMessage);
});

socket.on("disconnect", function () {
  console.log("disconnected from the server");
});
