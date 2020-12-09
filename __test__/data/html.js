module.exports = {
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
