class Table {
  constructor(app) {
    this.app = app;
    this.data = [];
    this.$tbody = document.getElementById("tbody");
    this.render();
  }
  html() {
    let trips = this.data.map(
      (trip) => /* html */ `
        <tr>
            <td>${trip.place}</td>
            <td style='color: ${trip.color};font-weight:bold'>
                ${trip.state}
            </td>
            <td>
            <button class="view" data-id="${trip.id}">view</button>
            </td>
        </tr>
        `
    );
    return trips.join("");
  }
  event() {
    let views = document.querySelectorAll(".view");
    views.forEach((el) =>
      el.addEventListener("click", (event) => {
        console.log(event.target.getAttribute("data-id"));
        let id = event.target.getAttribute("data-id");
        let results=this.app.storage.get(id)
        this.app.planning.updateRender(results)
      })
    );
  }
  render() {
    this.$tbody.innerHTML = "";
    this.data = this.app.storage.getall();
    console.log("test", this.data);
    this.$tbody.innerHTML = this.html();
    this.event();
  }
}
module.exports = { Table };
