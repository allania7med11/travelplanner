let results = require("Data/results.json");
class Planning {
  constructor(app) {
    this._data = {};
    this.app = app;
    this._details = ["place", "start_date", "end_date"];
    this._fields = ["image_url", ...this._details];
    this.$planning = document.getElementById("planning");
    this.render();
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
  cardHtml() {
    return /* html */ `
    <div class="label title">Trip Planning Results</div>
    <div class="infos">
      <div class="image">
        <img 
          src="${this._data["image_url"]}" />
      </div>
      <div class="details">
        <div  class="name">My trip to: ${this._data["place"]}</div>
        <div  class="time">Departing: ${this._data["start_date"]}</div>
        <div id="planning_end_date" class="time">Ending: ${
          this._data["end_date"]
        }</div>
      </div>
    </div>
    <div class="chart">
      <div id="myChart"></div>
    </div>
    `;
  }
  chartRender() {
    var ctx = document.getElementById("myChart").getContext("2d");
    var chart = new Chart(ctx, {
      // The type of chart we want to create
      type: "line",

      // The data for our dataset
      data: {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
        ],
        datasets: [
          {
            label: "My First dataset",
            backgroundColor: "rgb(255, 99, 132)",
            borderColor: "rgb(255, 99, 132)",
            data: [0, 10, 5, 2, 20, 30, 45],
          },
        ],
      },

      // Configuration options go here
      options: {},
    });
  }
  render() {
    let rtn;
    if (this.clean(this._data)) {
      this.$planning.innerHTML = "";
      rtn = this.cardHtml();
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
    }
    this.$planning.innerHTML = rtn;
    this.chartRender()
  }
  async updateRender(results) {
    this.update(results);
    this.render();
  }
}
module.exports = { Planning };
