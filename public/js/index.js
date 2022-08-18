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

socket.on("newLocationMessage", function (newMessage) {
  console.log("new location", newMessage);
  var li = $("<li></li>");
  let a = $('<a target="_blank">My Current Location</a>');
  li.text(`${newMessage.from} :`);
  a.attr("href", newMessage.url);
  li.append(a);
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

let locationButton = $("#send-location");

locationButton.on("click", function () {
  if (!navigator.geolocation) {
    return alert("Geolocation is not supported by your browser");
  }
  navigator.geolocation.getCurrentPosition(
    function (location) {
      socket.emit("createLocationMessage", {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    },
    function () {
      alert("unable to fetch location");
    }
  );
});
