let { Modal } =require("./Modal")
let { Form } =require("./Form")
let { Api } =require("./Api")
let { Planning } =require("./Planning")
class App {
    constructor(){
        this.modal = new Modal(this)
        this.form = new Form(this)
        this.api = new Api(this)
        this.planning = new Planning(this)
    }
}
module.exports = { App };