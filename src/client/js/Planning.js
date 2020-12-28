let { Infos } = require("./planning/Infos");
let { Charts } = require("./planning/Charts");
class Planning {
  constructor(app) {
    this._data = {};
    this.app = app;
    this.infos = new Infos(this);
    this.charts = new Charts(this);
    this._details = ["place", "start_date", "end_date"];
    this._fields = ["image_url", ...this._details, "weather"];
    this.$planning = document.getElementById("planning");
    let trips = this.app.storage.getall();
    if (trips.length > 0) {
      this.updateRender(trips[0]);
    }
  }
  clean(data) {
    for (let field of this._fields) {
      if (data[field] === undefined) {
        return false;
      }
    }
    return true;
  }
  save() {
    if (this._data["notsaved"] === true) {
      this._data["notsaved"] = false;
      let obj = this._fields.reduce((acc, cv) => {
        acc[cv] = this._data[cv];
        return acc;
      }, {});
      this.app.storage.create(obj);
      this._data["notsaved"] = false;
      this.app.table.render();
      this.updateRender(this._data);
    }
  }
  update(results) {
    if (this.clean(results)) {
      this._data = results;
      this.charts.display = "temp"; 
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
      this.infos.event();
      this.charts.event();
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
  async updateRender(results) {
    this.update(results);
    this.render();
  }
}
module.exports = { Planning };
