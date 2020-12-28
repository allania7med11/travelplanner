class Infos {
  constructor(planning) {
    this.planning = planning;
  }
  event() {
    let image = document.getElementById("infos_img");
    image.onerror = () => {
      image.onerror = null;
      image.src = "/images/noimage.png";
    };
    let save = document.querySelectorAll("#save");
    if (save.length > 0) {
      save[0].addEventListener("click", (event) => {
        debugger
        this.planning.save();
      });
    }
  }
  html() {
    let data = this.planning._data;
    return /* html */ `
    <div class="infos">
      <div class="image">
        <img 
          id="infos_img"
          src="${data["image_url"]}"
           />
      </div>
      <div class="details">
        <div  class="name">My trip to: ${data["place"]}</div>
        <div  class="time">Departing: ${data["start_date"]}</div>
        <div  class="time">Ending: ${data["end_date"]}</div>
        <div  class="time">State: ${data["state"]}</div>
        ${
          data["notsaved"] === true
            ? "<div><button class='save' id='save'>save trip</button></div>"
            : ""
        }
      </div>
    </div>
    `;
  }
}
module.exports = { Infos };
