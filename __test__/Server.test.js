let { api } = require("../src/server/js/Api");
let inputs = require("./data/inputs.json");
describe("Testing the server api", () => {
  test("test post trip", async () => {
    const { place } = inputs;
    // get new start and end date (since api not return data for old dates)
    const start_date = new Date();
    const end_date = new Date();
    end_date.setDate(start_date.getDate() + 3);
    const results = await api.post(place, start_date.toLocaleDateString(), end_date.toLocaleDateString());
    let fields = ["place", "start_date", "end_date", "image_url", "weather"];
    for (let field of fields) {
      expect(results[field]).not.toBeNull();
    }
    expect(results.weather.length).toBe(3);
  });
});
