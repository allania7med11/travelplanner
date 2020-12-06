class Analysis {
  constructor(app) {
    this._data = {};
    this.app = app;
    this._fields = ["title", "txt", "score_tag", "subjectivity", "confidence"];
    this.$tbody = document.getElementById("tbody");
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
      this.$tbody.innerHTML = "";
      let arr = this._fields.map((field) => `<td>${this._data[field]}</td>`);
      let rtn = `
      <tr>
        ${arr.join("")}
      </tr>
      `;
      this.$tbody.innerHTML = rtn;
    }
  }
  async updateRender() {
    let results = await this.app.api.get();
    this.update(results);
    this.render();
  }
}
export { Analysis };
