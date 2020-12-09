class Form {
  constructor(app) {
    this.app = app;
    this.fields = ["title", "txt"];
    this.$form = document.getElementById("form");
    this.$inputs = {
      title: document.getElementById("title"),
      txt: document.getElementById("txt"),
    };
    this.$form.addEventListener("submit", this.handleSubmit.bind(this));
  }
  async handleSubmit(event) {
    event.preventDefault();
    let obj = {};
    for (const id of this.fields) {
      obj[id] = this.$inputs[id].value;
    }
    let results = await this.app.api.post(obj);
    if(results===true){
      await this.app.analysis.updateRender();
    }
    this.app.modal.hideModel();
  }
}
module.exports = { Form };
