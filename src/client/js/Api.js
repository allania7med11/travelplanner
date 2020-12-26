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
      image_url:"https://pixabay.com/get/54e5d4424251b10ff3d8992cc6213278123adaed4e5077497d287ed79649c4_640.jpg",
      weather:[
        {
          "valid_date": "2020-12-24",
          "max_temp": 19.4,
          "min_temp":15,
          "precip":1
        },
        {
          "valid_date": "2020-12-25",
          "max_temp": 18.6,
          "min_temp":17,
          "precip":5
        },
        {
          "valid_date": "2020-12-26",
          "max_temp": 10.8,
          "min_temp":2,
          "precip":4
        },
        {
          "valid_date": "2020-12-27",
          "max_temp": 14,
          "min_temp":13,
          "precip":1
        },
        {
          "valid_date": "2020-12-28",
          "max_temp": 18.8,
          "min_temp":10,
          "precip":10
        }
      ]
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
