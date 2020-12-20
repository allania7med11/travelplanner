const express = require("express");
var bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();
let { server } = process.env;
let { analysis } = require(server + "/js/Analysis.js");
let { api } = require(server + "/js/Api.js");
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.get("/analysis", async function(req, res) {
//   let rtn = await analysis.getAnalysis();
//   res.send(rtn);
// });
app.post("/trip", async function(req, res) {
  debugger
  const { place } = req.body;
  try {
    if(!place){
      throw "data err"
    }
    const results = await api.post(place);
    if(results===false){
      throw "results err"
    }
    res.send(results);
  } catch (err) {
    console.log(err);
    res.send({err:true});
  }
});
app.use(express.static("dist"));

let port = process.env.PORT || 8080;
app.listen(port, function() {
  console.log(`app listening on port ${port}!`);
});
