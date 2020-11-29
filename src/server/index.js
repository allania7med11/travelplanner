const express = require("express");

const app = express();

app.use(express.static("src/client"));
let port = 8080;
app.listen(port, function() {
  console.log(`app listening on port ${port}!`);
});