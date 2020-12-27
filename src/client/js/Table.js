class Table {
  constructor(app) {
    this.app = app;
    this.data = [];
    this.$tbody = document.getElementById("tbody");
    this.render();
  }
  html() {
    if(this.data.length===0){
      return /* html */`
            <tr>
              <td colspan="3">no trips available</td>
            </tr>`
    }
    let trips = this.data.map(
      (trip) => /* html */ `
        <tr>
            <td>${trip.place}</td>
            <td style='color: ${trip.color};font-weight:bold'>
                ${trip.state}
            </td>
            <td>
            <button class="view" data-id="${trip.id}"></button>
            <button class="delete" data-id="${trip.id}"></button>
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
    let deletes = document.querySelectorAll(".delete");
    deletes.forEach((el) =>
      el.addEventListener("click", (event) => {
        console.log(event.target.getAttribute("data-id"));
        let id = event.target.getAttribute("data-id");
        this.app.storage.delete(id)
        this.render()
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
