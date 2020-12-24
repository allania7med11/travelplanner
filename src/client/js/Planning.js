let results = require("Data/results.json");
class Planning {
  constructor(app) {
    this._data = {};
    this.app = app;
    this._details = ["place", "start_date", "end_date"];
    this._fields = ["image_url", ...this._details];
    this.$planning = document.getElementById("planning");
    // this.updateRender();
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
  render() {
    let rtn
    if (this.clean(this._data)) {
      this.$planning.innerHTML = "";
      rtn = `
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
      `;
    } else {
      rtn = `
      <div class="infos">
        <div class="details">
          <div  class="name">No Data Available</div>
        </div>
      </div>
      `;
    }
    this.$planning.innerHTML = rtn;
  }
  async updateRender(results) {
    this.update(results);
    this.render();
  }
}
module.exports = { Planning };
