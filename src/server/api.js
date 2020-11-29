require("dotenv").config();
const fs = require("fs").promises;
const fetch = require("node-fetch");
const key = process.env.API_KEY;
let url = "https://api.meaningcloud.com/sentiment-2.1";
//let text="Enjoyed staying: location is great, not far from a subway station and only 15 minutes ride from all the sights. There are lots of restaurants and shops nearby. Cheerful and welcoming atmosphere. Thanks for the hospitality."
sentimentAnalysis = async (txt) => {
  var requestOptions = {
    method: "POST",
    redirect: "follow",
  };
  try {
    response = await fetch(
      `${url}?key=${key}&txt=${txt}&lang=en`,
      requestOptions
    );
    result = await response.json();
    await fs.writeFile("data.json", JSON.stringify(result));
    let { score_tag, agreement, subjectivity, confidence, irony } = result;
    return {
      score_tag,
      agreement,
      subjectivity,
      confidence,
      irony,
    };
  } catch (error) {
    console.log("error", error);
  }
};
//sentimentAnalysis(text)
module.exports = sentimentAnalysis;
