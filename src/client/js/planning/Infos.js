class Infos {
  constructor(planning) {
    this.planning = planning;
  }
  imagError() {
    let image = document.getElementById("infos_img");
    image.onerror = () => {
      image.onerror = null;
      image.src = "/images/noimage.png";
    };
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
      </div>
    </div>
    `;
  }
}
module.exports = { Infos };
