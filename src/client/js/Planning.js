let results =require("Data/results.json")
class Planning {
    constructor(app) {
      this._data = {};
      this.app = app;
      this._fields = [
        "title",
        "txt",
        "score_tag",
        "agreement",
        "subjectivity",
        "confidence",
        "irony",
      ];
      this._display = {
        score_tag: "Polarity",
        agreement: "Agreement",
        subjectivity: "Subjectivity",
        confidence: "Confidence",
        irony: "Irony",
      };
      this.$analysis = document.getElementById("analysis");
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
    render() {
      if (this.clean(this._data)) {
        this.$analysis.innerHTML = "";
        let arr = this._fields.slice(2).map(
          (field) => `
        <div class='card property'>
            <div  class='key'>
              ${this._display[field]}
            </div>
            <div id=${field} class='value'>
              ${this._data[field]}
            </div>
        </div>
        `
        );
        let rtn = `
        <div class='row' >
          <div class='card inputs'>
            <div id='titleDisplay' class='label title'>
              ${this._data["title"]}
            </div>
            <div id='txtDisplay'  class='value'>
              ${this._data["txt"]}
            </div>
          </div>
        </div>
        <div class='row' >
          ${arr.join("")}
        </div>
        `;
        this.$analysis.innerHTML = rtn;
      }
    }
    async updateRender() {
      let results = await this.app.api.get();
      this.update(results);
      this.render();
    }
  }
  module.exports = { Planning };
  