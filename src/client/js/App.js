let { Modal } =require("./Modal")
let { Form } =require("./Form")
let { Api } =require("./Api")
let { Planning } =require("./Planning")
let { Storage } =require("./Storage")
let { Table } =require("./Table")
class App {
    constructor(){
        this.modal = new Modal(this)
        this.form = new Form(this)
        this.api = new Api(this)
        this.planning = new Planning(this)
        this.storage = new Storage(this)
        this.table = new Table(this)
    }
}
module.exports = { App };