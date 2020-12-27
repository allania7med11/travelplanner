let { Infos } = require("./planning/Infos");
let { Charts } = require("./planning/Charts");
class Planning  {
  constructor(app) {
    this._data = {};
    this.app = app;
    this.infos = new Infos(this)
    this.charts = new Charts(this)
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
  html() {
    return /* html */ `
      <div class="label title">Trip Planning Results</div>
      ${this.infos.html()}
      ${this.charts.html()}
    `;
  }
  render() {
    let rtn;
    if (this.clean(this._data)) {
      this.$planning.innerHTML = "";
      rtn = this.html();
      this.$planning.innerHTML = rtn;
      this.infos.imagError();
      this.charts.attachEvent();
      this.charts.render();
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
