let storageTest = require("Data/storage.json");
console.log({ storageTest });
class Storage {
  constructor() {
    let local = window.localStorage.getItem("trips");
    if (local === null) {
      local = JSON.stringify(storageTest);
      window.localStorage.setItem("trips", local);
    }
    this.storage = JSON.parse(local);
    this.storage = storageTest;
  }
  getState({ start_date, end_date }) {
    let today = new Date();
    let start = new Date(start_date);
    let end = new Date(end_date);
    let cvt = 1000 * 3600 * 24;
    let state, color;
    if (start.getTime() - today.getTime() > 0) {
      let days = Math.ceil((start.getTime() - today.getTime()) / cvt);
      color = "green";
      if (days === 1) {
        state = "one day to start";
      } else {
        state = `${days} days to start`;
      }
    } else if (end.getTime() - today.getTime() > 0) {
      color = "orange";
      let days = Math.ceil((today.getTime() - start.getTime()) / cvt);
      if (days === 1) {
        state = "started one day ago";
      } else {
        state = `started ${days} days ago`;
      }
    } else {
      color = "red";
      let days = Math.ceil((today.getTime() - end.getTime()) / cvt);
      if (days === 1) {
        state = "finished one day ago";
      } else {
        state = `finished ${days} days ago`;
      }
    }
    return { state, color };
  }
  create(obj) {
    this.storage.id = this.storage.id + 1;
    let id = this.storage.id;
    this.storage.data[id] = obj;
    window.localStorage.setItem("trips", JSON.stringify(this.storage));
  }
  getall() {
    let keys = Object.keys(this.storage.data).sort(
      (ky1, ky2) => parseInt(ky2) - parseInt(ky1)
    );
    let lst = keys.map((key) => ({
      id:key,
      ...this.storage.data[key],
      ...this.getState(this.storage.data[key]),
    }));
    return lst;
  }
  get(id) {
    let trip = this.storage.data[id];
    return {
      ...trip,
      ...this.getState(trip)
    };
  }
  update(id, obj) {
    this.storage.data[id] = obj;
    window.localStorage.setItem("trips", JSON.stringify(this.storage));
  }
  delete(id) {
    delete this.storage.data[id];
    window.localStorage.setItem("trips", JSON.stringify(this.storage));
  }
}
module.exports = { Storage };
