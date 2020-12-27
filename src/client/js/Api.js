let results = require("Data/results.json");

class Api {
  constructor() {
    this.url = "/trip";
  }
  async get() {
    let obj = {
      place:"kairouan",
      start_date:"2020-12-26",
      end_date: "2020-12-31"
    }
   // let results = await this.post(obj);
    console.log({results})
    return results;
  }
  async post(obj) {
    let response = await fetch(this.url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(obj),
    });
    let results = await response.json();
    return results;
  }
}
module.exports = { Api };
