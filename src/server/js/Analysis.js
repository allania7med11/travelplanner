const dotenv = require("dotenv");
dotenv.config();
const fs = require("fs").promises;
let { data } = process.env;
let inputs = require(data + "/inputs.json");
let results = require(data + "/results.json");
class Analysis {
  constructor() {
    this.inputs = inputs;
    this.results = results;
    this.fields = [
      "score_tag",
      "agreement",
      "subjectivity",
      "confidence",
      "irony",
    ];
  }
  async getAnalysis() {
    let obj = this.fields.reduce((acc, cv) => {
      acc[cv] = this.results[cv];
      return acc;
    }, {});
    return { ...obj, ...this.inputs };
  }
  async update(inputs, results) {
    try {
      if (!inputs || !results) {
        throw "data err";
      }
      fs.writeFile(data + "/inputs.json", JSON.stringify(inputs));
      fs.writeFile(data + "/results.json", JSON.stringify(results));
      this.inputs = inputs;
      this.results = results;
      console.log("run");
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }
}
let analysis = new Analysis();
module.exports = { analysis };
