
require('dotenv').config()
const fetch = require("node-fetch");
const key = process.env.API_KEY;
let url="https://api.meaningcloud.com/sentiment-2.1"
let text="Enjoyed staying: location is great, not far from a subway station and only 15 minutes ride from all the sights. There are lots of restaurants and shops nearby. Cheerful and welcoming atmosphere. Thanks for the hospitality."
sentimentAnalysis = async (text) => {
  var requestOptions = {
    method: 'POST',
    redirect: 'follow'
  };
  try{
    response=await fetch(`${url}?key=${key}&txt=${text}&lang=en`, requestOptions)
    result= await response.text()
    console.log(result)
  }catch(error){
    console.log('error', error)
  }
};
sentimentAnalysis(text)