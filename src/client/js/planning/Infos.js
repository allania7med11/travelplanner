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
        <div  class="name">My trip to: <span id="dt-place">${data["place"]}</span></div>
        <div  class="time">Departing: <span id="dt-start_date">${data["start_date"]}</span></div>
        <div  class="time">Ending: <span id="dt-end_date">${data["end_date"]}</span></div>
        <div  class="time">State: <span id="dt-state">${data["state"]}</span></div>
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
