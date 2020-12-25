const dotenv = require("dotenv");
dotenv.config();
const fetch = require("node-fetch");
class Api {
  constructor() {
    this.geonames = {
      url: "http://api.geonames.org/searchJSON",
      username: "allania7med11",
    };
    this.weatherbit = {
      url: "https://api.weatherbit.io/v2.0/forecast/daily",
      key: process.env.weatherbit_key,
    };
    this.pixabay = {
      url: "https://pixabay.com/api",
      key: process.env.pixabay_key,
    };
  }
  async getCoordinates(place) {
    let { url, username } = this.geonames;
    try {
      let fullUrl = encodeURI(
        `${url}?q=${place}&maxRows=1&username=${username}`
      );
      let response = await fetch(fullUrl);
      let results = await response.json();
      return results["geonames"][0];
    } catch (error) {
      console.log("error", error);
      return false;
    }
  }
  async getWeather(lat, lon, start_date, end_date) {
    debugger;
    let today = new Date();
    let start = new Date(start_date);
    let end = new Date(end_date);
    let cvt = 1000 * 3600 * 24;
    let days = Math.ceil((end.getTime() - today.getTime()) / cvt);
    let daysToStart = Math.ceil((start.getTime() - today.getTime()) / cvt);
    // To calculate the no. of days between two dates
    let { url, key } = this.weatherbit;
    try {
      let fullUrl = encodeURI(
        `${url}?lat=${lat}&lon=${lon}&key=${key}&days=${days}`
      );
      let response = await fetch(fullUrl);
      let results = await response.json();
      let data = results.data;
      if (daysToStart > 0) {
        data = data.slice(daysToStart);
      }
      return data
    } catch (error) {
      console.log("error", error);
      return false;
    }
  }
  async getImage(place) {
    let { url, key } = this.pixabay;
    try {
      let fullUrl = encodeURI(`${url}?q=${place}&image_type=photo0&key=${key}`);
      let response = await fetch(fullUrl);
      let results = await response.json();
      return results.hits[0].webformatURL;
    } catch (error) {
      console.log("error", error);
      return false;
    }
  }
  async post(place, start_date, end_date) {
    try {
      let { lat, lng } = await this.getCoordinates(place);
      let weather = await this.getWeather(lat, lng, start_date, end_date);
      let image_url = await this.getImage(place);
      return { place, start_date, end_date, image_url, weather };
    } catch (err) {
      console.log({ err });
    }
  }
}
let api = new Api();
module.exports = { api };
