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
app.get("/analysis", async function(req, res) {
  let rtn = analysis.getAnalysis();
  res.send(rtn);
});
app.post("/analysis", async function(req, res) {
  const { title, txt } = req.body;
  try {
    if(!title || !txt){
      throw "data err"
    }
    const results = await api.post(txt);
    if(results===false){
      throw "results err"
    }
    let update=await analysis.update({ title, txt }, results);
    if(update===false){
      throw "update err"
    }
    res.status(201).send();
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
});
app.use(express.static("dist"));

let port = 8080;
app.listen(port, function() {
  console.log(`app listening on port ${port}!`);
});
