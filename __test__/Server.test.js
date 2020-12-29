let { api } = require("../src/server/js/Api");
let inputs = require("./data/inputs.json");
let output = require("./data/output.json");
describe("Testing the server api", () => {
  test("test post trip", async () => {
    const { place, start_date, end_date } = inputs;
    const results = await api.post(place, start_date, end_date);
    let fields = ["place", "start_date", "end_date"];
    for (let field of fields) {
      expect(results[field]).toBe(output[field]);
    }
    expect(results.weather.length).toBe(output.weather.length);
  });
});
