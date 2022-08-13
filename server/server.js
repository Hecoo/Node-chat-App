// console.log(__dirname + "/../public");
let path = require("path");
let PublicPath = path.join(__dirname, "/../public");
// console.log(PublicPath);
let express = require("express");
let app = express();
let port = process.env.PORT || 3000;

app.use(express.static(PublicPath));

app.listen(port, () => {
  console.log(`app is listening on port : ${port}`);
});
