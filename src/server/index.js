const express = require("express");
var bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();

let { api } = require(__dirname + "/js/Api.js");
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/trip", async function(req, res) {
  const { place, start_date, end_date } = req.body;
  try {
    if (!place || !start_date || !end_date) {
      throw "data err";
    }
    const results = await api.post(place, start_date, end_date);
    if (results === false) {
      throw "results err";
    }
    res.send(results);
  } catch (err) {
    console.log(err);
    res.send({ err: true });
  }
});
app.use(express.static("dist"));

let port = process.env.PORT || 4010;
app.listen(port, function() {
  console.log(`app listening on port ${port}!`);
});
