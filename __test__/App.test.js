let html = require("./data/html");
let inputs = require("./data/inputs.json");
let output = require("./data/output.json");
let { App } = require("../src/client/js/App");

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({}),
  })
);

output["state"] = "2 days to start";
describe("Testing the submit functionality", () => {
  // The test() function has two arguments - a string description, and an actual test as a callback function.
  test("Testing the handleSubmit() function", async () => {
    expect(App).toBeDefined();
    document.body.innerHTML = html.app;
    let app = new App();
    app.api.post = (obj) => {
      for (let key in inputs) {
        if (obj[key] !== inputs[key]) {
          return { err: true };
        }
      }
      return output;
    };
    app.api.get = () => {
      return output;
    };
    output["state"] = app.storage.getState(output).state;
    for (let key in inputs) {
      let dom = document.getElementById(key);
      dom.value = inputs[key];
    }
    await app.form.handleSubmit({ preventDefault: () => {} });
    let fields = ["place", "start_date", "end_date", "state"];
    for (let field of fields) {
      let dom = document.getElementById("dt-" + field);
      expect(dom.innerHTML.trim()).toBe(output[field]);
    }
  });
});
