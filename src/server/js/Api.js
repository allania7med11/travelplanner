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
      url: "https://api.weatherbit.io/v2.0/current",
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
  async getWeather(lat, lon) {
    let { url, key } = this.weatherbit;
    try {
      let fullUrl = encodeURI(`${url}?lat=${lat}&lon=${lon}&key=${key}`);
      let response = await fetch(fullUrl);
      let results = await response.json();
      return results;
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
      return results;
    } catch (error) {
      console.log("error", error);
      return false;
    }
  }
  async post(place) {
    try {
      let { lat, lng } = await this.getCoordinates(place);
      let weather = await this.getWeather(lat, lng);
      let image = await this.getImage(place);
      return { weather, image };
    } catch (err) {
      console.log({ err });
    }
  }
}
let api = new Api();
module.exports = { api };
