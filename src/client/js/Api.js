let results = require("Data/results.json");

class Api {
  constructor() {
    this.url = "/trip";
  }
  async get() {
    // let requestOptions = {
    //   method: "GET",
    //   redirect: "follow",
    // };
    // let response = await fetch(this.url, requestOptions);
    // let results = await response.json();
    results = {
      place: "Kairouan",
      start_date: "2020-12-24",
      end_date: "2020-12-31",
      image_url:"https://pixabay.com/get/54e5d4424251b10ff3d8992cc6213278123adaed4e5077497d287ed79649c4_640.jpg"
    };
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
