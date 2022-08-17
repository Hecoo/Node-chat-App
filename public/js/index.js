let socket = io();
socket.on("connect", function () {
  console.log("connected to server");
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

socket.on("newMessage", function (newMessage) {
  console.log("new Message", newMessage);
  // var li = jQuery("<li></li>");
  // li.text(`${newMessage.from} : ${newMessage.text}`);
  // jQuery("#messages").append(li);
});

socket.on("newMessage", function (newMessage) {
  console.log("new Message", newMessage);
});

socket.on("disconnect", function () {
  console.log("disconnected from the server");
});

jQuery("#message-form").on("submit", function (e) {
  e.preventDefault();

  socket.emit(
    "CreateMessage",
    {
      from: "User",
      text: jQuery("[name=message]").val(),
    },
    function () {}
  );
});
