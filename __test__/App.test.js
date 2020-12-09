let html = require("./data/html");
let inputs = require("./data/inputs.json");
let output = require("./data/output.json");
let { App } = require("../src/client/js/App");

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({}),
  })
);
describe("Testing the submit functionality", () => {
  // The test() function has two arguments - a string description, and an actual test as a callback function.
  test("Testing the handleSubmit() function", async () => {
    expect(App).toBeDefined();
    document.body.innerHTML = html.app;
    let app = new App();
    app.api.post = (obj) => {
      return obj.title === inputs.title && obj.txt === inputs.txt;
    };
    app.api.get = () => {
      return output;
    };
    const title = document.getElementById("title");
    const txt = document.getElementById("txt");
    title.value = inputs.title;
    txt.value = inputs.txt;
    await app.form.handleSubmit({ preventDefault: () => {} });
    let fields = ["score_tag", "agreement", "subjectivity", "confidence", "irony"];
    fields.forEach((field) => {
      let elm = document.getElementById(field);
      expect(elm.innerHTML.trim()).toBe(output[field]);
    });
  });
});
