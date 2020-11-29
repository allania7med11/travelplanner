const express = require("express");
var bodyParser = require("body-parser");
const sentimentAnalysis = require("./api");
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
let projectData = [];
app.use(express.static("src/client"));
app.post("/data",async function(req, res) {
  const { name, txt } = req.body;
  const result =await sentimentAnalysis(txt);
  projectData.push({ name, txt, result });
  res.send(projectData);
});
let port = 8080;
app.listen(port, function() {
  console.log(`app listening on port ${port}!`);
});
