const express = require("express");
var bodyParser = require("body-parser");
const sentimentAnalysis = require("./api");
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
let projectData = [];
app.use(express.static("dist"));
let testTitle="Title1"
let text="Enjoyed staying: location is great, not far from a subway station and only 15 minutes ride from all the sights. There are lots of restaurants and shops nearby. Cheerful and welcoming atmosphere. Thanks for the hospitality."
app.post("/data", async function(req, res) {
  const { title, txt } = req.body;
  const results = await sentimentAnalysis(txt);
  projectData = [{ title:testTitle, txt:text, ...results }];
  res.send(projectData);
});
let port = 8080;
app.listen(port, function() {
  console.log(`app listening on port ${port}!`);
});
