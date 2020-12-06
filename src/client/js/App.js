import { Modal } from "./Modal"
import { Form } from "./Form"
import { Api } from "./Api"
import { Analysis } from "./Analysis"
class App {
    constructor(){
        this.modal = new Modal(this)
        this.form = new Form(this)
        this.api = new Api(this)
        this.analysis = new Analysis(this)
    }
}
export { App };