class Charts {
  constructor(planning) {
    this.planning = planning
    this.display = "temp";
  }
  event() {
    let select = document.getElementById("display");
    let chart = document.getElementById("chart");
    select.onchange = (evt) => {
      chart.innerHTML = ""
      this.display = evt.target.value;
      chart.innerHTML = '<canvas id="myChart"></canvas>'
      this.render()
    };
  }
  chartData() {
    let weather = this.planning._data.weather
    let obj = {};
    obj.temp = {
      // The type of chart we want to create
      type: "line",

      // The data for our dataset
      data: {
        labels: weather.map((cv) => cv.valid_date),
        datasets: [
          {
            label: "Maximum Temperature (Celcius)",
            borderColor: "rgb(220,20,60)",
            fill: false,
            data: weather.map((cv) => cv.max_temp),
            type: "line",
          },
          {
            label: "Minimum Temperature (Celcius)",
            borderColor: "rgb(0,255,255)",
            fill: false,
            data: weather.map((cv) => cv.min_temp),
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
        labels: weather.map((cv) => cv.valid_date),
        datasets: [
          {
            label: "Accumulated precipitation (mm)",
            backgroundColor: "blue",
            data: weather.map((cv) => cv.precip),
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
        labels: weather.map((cv) => cv.valid_date),
        datasets: [
          {
            label: "Wind speed  (m/s)",
            borderColor: "rgb(243,126,48)",
            fill: false,
            data: weather.map((cv) => cv.wind_spd),
            type: "line",
          }
        ],
      },

      // Configuration options go here
      options: {},
    };
    return obj;
  }
  html(){
    return /* html */ `
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
      `
  }
  render() {
    let dom = document.getElementById("myChart");
    if(typeof(dom) != 'undefined' && dom != null){
      var ctx = document.getElementById("myChart").getContext("2d");
      var chart = new Chart(ctx, this.chartData()[this.display]);
    }
  }
}
module.exports = { Charts };
