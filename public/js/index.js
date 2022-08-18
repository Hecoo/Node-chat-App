let socket = io();
socket.on("connect", function () {
  console.log("connected to server");
});

socket.on("disconnect", function () {
  console.log("disconnected from the server");
});

socket.on("newMessage", function (newMessage) {
  let formattedTime = moment(newMessage.createdAt).format("h:mm a");
  var li = $("<li></li>");
  li.text(`${newMessage.from} ${formattedTime} : ${newMessage.text}`);
  jQuery("#messages").append(li);
});

socket.on("newLocationMessage", function (newMessage) {
  let formattedTime = moment(newMessage.createdAt).format("h:mm a");
  var li = $("<li></li>");
  let a = $('<a target="_blank">My Current Location</a>');
  li.text(`${newMessage.from} ${formattedTime} :`);
  a.attr("href", newMessage.url);
  li.append(a);
  jQuery("#messages").append(li);
});

$("#message-form").submit(function (e) {
  e.preventDefault();

  socket.emit(
    "createMessage",
    {
      from: "User",
      text: $("[name=message]").val(),
    },
    function () {
      $("[name=message]").val("");
    }
  );
});

let locationButton = $("#send-location");

locationButton.on("click", function () {
  if (!navigator.geolocation) {
    return alert("Geolocation is not supported by your browser");
  }
  locationButton.attr("disabled", "disabled").text("Sending Location...");
  navigator.geolocation.getCurrentPosition(
    function (location) {
      locationButton.removeAttr("disabled").text("Send location");
      socket.emit("createLocationMessage", {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    },
    function () {
      locationButton.removeAttr("disabled").text("Send location");
      alert("unable to fetch location");
    }
  );
});
