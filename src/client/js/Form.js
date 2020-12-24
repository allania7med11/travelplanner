class Form {
  constructor(app) {
    this.app = app;
    this.fields = ["place", "start_date", "end_date"];
    this.$form = document.getElementById("form");
    this.$inputs = this.fields.reduce((acc, cv) => {
      acc[cv] = document.getElementById(cv);
      return acc
    }, {});
    this.$form.addEventListener("submit", this.handleSubmit.bind(this));
  }
  getObj() {
    let obj = this.fields.reduce((acc, cv) => {
      acc[cv] = this.$inputs[cv].value;
      return acc
    }, {});
    console.log({obj})
    return obj;
  }
  async handleSubmit(event) {
    event.preventDefault();
    let obj = this.getObj();
    let results = await this.app.api.post(obj);
    console.log({ results });
    // if(results===true){
    //   await this.app.analysis.updateRender();
    // }
    //this.app.modal.hideModel();
  }
}
module.exports = { Form };
