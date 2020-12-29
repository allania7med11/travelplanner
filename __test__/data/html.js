module.exports = {
  app: `
  <main class="app">
  <div class="title">Travel Planner</div>
  <section class="modalContainer">
    <button id="myBtn">New Trip</button>
    <div id="myModal" class="modal">
      <!-- Modal content -->
      <div class="modal-content">
        <div class="modal-header">
          <span class="close">&times;</span>
          <h2>Trip Infos</h2>
        </div>
        <div class="modal-body">
          <form class="form" id="form">
            <input id="place" type="text" class="input" name="place" value="" placeholder="Place" required />
            <input id="start_date" type="date" class="input" name="place" value="" placeholder="Start Date"
              required />
            <input id="end_date" type="date" class="input" name="place" value="" placeholder="End Date" required />
            <input id="submit" type="submit" name="" value="start planning" />
          </form>
        </div>
      </div>
    </div>
  </section>
  <section>
    <div id="table" class="table">
      <table id="trips">
        <thead>
          <tr>
            <th>Place</th>
            <th>State</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody id="tbody">
          <tr>
            <td colspan="3">no trips available</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
  <section>
    <div id="planning" class="planning">
    </div>
  </section>
</main>
  `,
};
