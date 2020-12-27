class Storage {
  constructor() {
    let local = window.localStorage.getItem("trips");
    if (local === undefined) {
      local = JSON.stringify({
        id: 0,
        data: {},
      });
      window.localStorage.setItem("trips", local);
    }
    this.storage = JSON.parse(local);
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
    let lst=keys.map(cv => this.storage.data[cv])
    return lst
  }
  get(id){
      return this.storage.data[id]
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