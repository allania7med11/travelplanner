let { Charts } = require("./Charts");
class Planning extends Charts {
  constructor(app) {
    super();
    this._data = {};
    this.app = app;
    this._details = ["place", "start_date", "end_date"];
    this._fields = ["image_url", ...this._details, "weather"];
    this.$planning = document.getElementById("planning");
    this.updateRender();
  }
  clean(data) {
    for (let field of this._fields) {
      if (data[field] === undefined) {
        return false;
      }
    }
    return true;
  }
  update(results) {
    if (this.clean(results)) {
      this._data = results;
    }
  }
  Imagerror() {
    let image = document.getElementById("infos_img");
    image.onerror = () => {
      image.onerror = null;
      image.src = "/images/noimage.png";
    };
  }
  cardHtml() {
    return /* html */ `
    <div class="label title">Trip Planning Results</div>
    <div class="infos">
      <div class="image">
        <img 
          id="infos_img"
          src="${this._data["image_url"]}"
           />
      </div>
      <div class="details">
        <div  class="name">My trip to: ${this._data["place"]}</div>
        <div  class="time">Departing: ${this._data["start_date"]}</div>
        <div id="planning_end_date" class="time">Ending: ${
          this._data["end_date"]
        }</div>
      </div>
    </div>
    <div class="weather">
      <select id="display" name="display">
        <option value="temp">Temperature</option>
        <option value="prep">Precipitation</option>
        <option value="wind_spd">Wind</option>
      </select>
      <div id="chart" class="chart">
        <canvas id="myChart"></canvas>
      </div>
    </div>
    `;
  }
  render() {
    let rtn;
    if (this.clean(this._data)) {
      this.$planning.innerHTML = "";
      rtn = this.cardHtml();
      this.$planning.innerHTML = rtn;
      this.Imagerror();
      this.attachEvent();
      this.chartRender();
    } else {
      rtn = `
      <div class="infos">
        <div class="no_data">
          No Data Available
        </div>
      </div>
      <div class="chart">
        <canvas id="myChart"></canvas>
      </div>
      `;
      this.$planning.innerHTML = rtn;
    }
  }
  async updateRender() {
    let results = await this.app.api.get();
    this.update(results);
    this.render();
  }
}
module.exports = { Planning };
