let { Modal } =require("./Modal")
let { Form } =require("./Form")
let { Api } =require("./Api")
let { Analysis } =require("./Analysis")
class App {
    constructor(){
        this.modal = new Modal(this)
        this.form = new Form(this)
        this.api = new Api(this)
        // this.analysis = new Analysis(this)
    }
}
module.exports = { App };