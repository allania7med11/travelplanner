const dotenv = require("dotenv");
dotenv.config();
const fetch = require("node-fetch");
class Api {
  constructor() {
    this.key = process.env.API_KEY;
    this.url = "https://api.meaningcloud.com/sentiment-2.1";
  }
  async post(txt) {
    try {
      let response = await fetch(
        `${this.url}?key=${this.key}&txt=${txt}&lang=en`,
        {
          method: "POST",
          redirect: "follow",
        }
      );
      let results = await response.json();
      return results;
    } catch (error) {
      console.log("error", error);
      return false;
    }
  }
}
let api = new Api();
module.exports = { api };
