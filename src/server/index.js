const express = require("express");
var bodyParser = require("body-parser");
const sentimentAnalysis = require("./api");
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
let projectData = [];
app.use(express.static("dist"));
app.post("/data", async function(req, res) {
  const { name, txt } = req.body;
  const results = await sentimentAnalysis(txt);
  projectData = [{ name, txt, ...results }];
  res.send(projectData);
});
let port = 8080;
app.listen(port, function() {
  console.log(`app listening on port ${port}!`);
});
