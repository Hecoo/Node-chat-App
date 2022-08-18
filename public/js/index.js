let socket = io();
socket.on("connect", function () {
  console.log("connected to server");
});

socket.on("disconnect", function () {
  console.log("disconnected from the server");
});

socket.on("newMessage", function (newMessage) {
  console.log("new Message", newMessage);
  var li = $("<li></li>");
  li.text(`${newMessage.from} : ${newMessage.text}`);
  jQuery("#messages").append(li);
});

socket.emit(
  "createMessage",
  {
    from: "jen",
    text: "hello what are you doing today",
  },
  function (data) {
    console.log("got it", data);
  }
);

$("#message-form").submit(function (e) {
  e.preventDefault();

  socket.emit(
    "createMessage",
    {
      from: "User",
      text: $("[name=message]").val(),
    },
    function () {}
  );
});
