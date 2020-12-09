class Modal {
  constructor(app) {
    this.app = app;
    this.$modal = document.getElementById("myModal");
    this.$btn = document.getElementById("myBtn");
    this.$span = document.getElementsByClassName("close")[0];
    this.$btn.addEventListener("click", this.showModel.bind(this));
    this.$span.addEventListener("click", this.hideModel.bind(this));
  }
  showModel() {
    this.$modal.style.display = "block";
  }
  hideModel() {
    this.$modal.style.display = "none";
  }
}
module.exports = { Modal };
