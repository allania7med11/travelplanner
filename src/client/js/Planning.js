class Planning {
  constructor(app) {
    this._data = {};
    this.app = app;
    this._details = ["place", "start_date", "end_date"];
    this._fields = ["image_url", ...this._details];
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
    image.src = this._data["image_url"];
  }
  cardHtml() {
    return /* html */ `
    <div class="label title">Trip Planning Results</div>
    <div class="infos">
      <div class="image">
        <img 
          id="infos_img"
          src="/images/loading.jpg"
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
    <div class="chart">
      <canvas id="myChart"></canvas>
    </div>
    `;
  }
  chartData() {
    debugger
    let obj = {};
    obj.temp = {
      // The type of chart we want to create
      type: "line",

      // The data for our dataset
      data: {
        labels: this._data.weather.map((cv) => cv.valid_date),
        datasets: [
          {
            label: "Maximum Temperature (Celcius)",
            borderColor: "rgb(220,20,60)",
            fill: false,
            data: this._data.weather.map((cv) => cv.max_temp),
            type: "line",
          },
          {
            label: "Minimum Temperature (Celcius)",
            borderColor: "rgb(0,255,255)",
            fill: false,
            data: this._data.weather.map((cv) => cv.min_temp),
            type: "line",
          },
        ],
      },

      // Configuration options go here
      options: {},
    };
    obj.prep = {
      type: "bar",
      data: {
        labels: this._data.weather.map((cv) => cv.valid_date),
        datasets: [
          {
            label: "Accumulated precipitation (mm)",
            backgroundColor: "blue",
            data: this._data.weather.map((cv) => cv.precip),
          },
        ],
      },
      options: {
        legend: { display: false },
        title: {
          display: true,
          text: "Accumulated precipitation (mm)",
        },
      },
    };
    return obj;
  }
  chartRender() {
    var ctx = document.getElementById("myChart").getContext("2d");
    var chart = new Chart(ctx, this.chartData()["prep"]);
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
    this.Imagerror();
    this.chartRender();
  }
  async updateRender() {
    let results = await this.app.api.get();
    this.update(results);
    this.render();
  }
}
module.exports = { Planning };
