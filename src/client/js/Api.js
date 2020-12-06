class Api {
  constructor() {
    this.url = "/analysis";
  }
  async get() {
    let requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    let response = await fetch(this.url, requestOptions);
    let results = await response.json();
    return results;
  }
  async post(obj) {
    let response = await fetch(this.url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(obj),
    });
    return response.status == "201";
  }
}
export { Api };
