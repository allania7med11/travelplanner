class Table {
    constructor(app){
        this.app = app
        this.data = []
        this.$tbody = document.getElementById("tbody");
        this.render()
    }
    html() {
        let trips = this.data.map(trip=> /* html */`
        <tr>
            <td>${trip.place}</td>
            <td>${trip.state}</td>
            <td>${trip.place}</td>
        </tr>
        `)
        return  trips.join('')
    }
    render(){
        this.$tbody.innerHTML = "";
        this.data = this.app.storage.getall()
        console.log("test",this.data)
        this.$tbody.innerHTML = this.html();
    }
}
module.exports = { Table };