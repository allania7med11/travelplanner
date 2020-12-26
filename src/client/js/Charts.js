class Charts {
  constructor() {
    this.display = "temp";
  }
  attachEvent() {
    let select = document.getElementById("display");
    let chart = document.getElementById("chart");
    select.onchange = (evt) => {
      chart.innerHTML = ""
      this.display = evt.target.value;
      chart.innerHTML = '<canvas id="myChart"></canvas>'
      this.chartRender()
    };
  }
  chartData() {
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
    obj.wind_spd = {
      // The type of chart we want to create
      type: "line",

      // The data for our dataset
      data: {
        labels: this._data.weather.map((cv) => cv.valid_date),
        datasets: [
          {
            label: "Wind speed  (m/s)",
            borderColor: "rgb(243,126,48)",
            fill: false,
            data: this._data.weather.map((cv) => cv.wind_spd),
            type: "line",
          }
        ],
      },

      // Configuration options go here
      options: {},
    };
    return obj;
  }
  chartRender() {
    var ctx = document.getElementById("myChart").getContext("2d");
    var chart = new Chart(ctx, this.chartData()[this.display]);
  }
}
module.exports = { Charts };
