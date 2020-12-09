let html = {
  app: `
  <main class="app">
  <div class="title">Natural Language Processing</div>
  <section class="modalContainer">
    <button id="myBtn">NEW NLP</button>
    <div id="myModal" class="modal">
      <!-- Modal content -->
      <div class="modal-content">
        <div class="modal-header">
          <span class="close">&times;</span>
          <h2>NLP FORM</h2>
        </div>
        <div class="modal-body">
          <form class="form" id="form">
            <input
              id="title"
              type="text"
              class="input"
              name="title"
              value=""
              placeholder="Title"
              required
            />
            <textarea
              id="txt"
              class="input"
              name="txt"
              placeholder="Put your text here..."
              rows="10"
              required
            ></textarea>
            <input
              id="submit"
              type="submit"
              name=""
              value="start analysis"
            />
          </form>
        </div>
      </div>
    </div>
  </section>

  <section>
    <div class="label title">NLP Results</div>
    <div id="analysis" class="analysis">
      
    </div>
  </section>
</main>
`,
};
let  { App } = require("../src/client/js/App");
let inputs = {
  title: "Review of Hotel Alessandra",
  txt:
    "Great location, really pleasant and clean rooms, but the thing that makes this such a good place to stay are the staff. All of the people are incredibly helpful and generous with their time and advice. We travelled with two six year olds and lots of luggage and despite the stairs up to the elevator this was one of the nicest places we stayed in the four weeks we were in Europe.\n\nThanks for making our visit to Florence that much better.",
};
let output = {
  score_tag: "P",
  agreement: "DISAGREEMENT",
  subjectivity: "SUBJECTIVE",
  confidence: "86",
  irony: "NONIRONIC",
  title: "Review of Hotel Alessandra",
  txt:
    "Great location, really pleasant and clean rooms, but the thing that makes this such a good place to stay are the staff. All of the people are incredibly helpful and generous with their time and advice. We travelled with two six year olds and lots of luggage and despite the stairs up to the elevator this was one of the nicest places we stayed in the four weeks we were in Europe.\n\nThanks for making our visit to Florence that much better.",
};
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({}),
  })
);
describe("Testing the submit functionality",() => {
  // The test() function has two arguments - a string description, and an actual test as a callback function.  
  test("Testing the handleSubmit() function",async  () => {
    expect(App).toBeDefined();
    document.body.innerHTML = html.app;
    let app = new App(); 
    app.api.post = (obj) => {
      return obj.title===inputs.title && obj.txt===inputs.txt
    }
    app.api.get = () => {
      return output
    }
    const title = document.getElementById("title");
    const txt = document.getElementById("txt");
    title.value = inputs.title;
    txt.value = inputs.txt;
    await app.form.handleSubmit({preventDefault:() => {}})
    fields = ["score_tag", "agreement", "subjectivity", "confidence", "irony"];
    fields.forEach((field) => {
      let elm = document.getElementById(field);
      expect(elm.innerHTML.trim()).toBe(output[field]);
    });
})});
