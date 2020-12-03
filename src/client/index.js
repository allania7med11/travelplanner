import './styles/main.scss'
import './styles/modal.scss'
import './js/model'
import { form, inputs,modal } from './js/elements'
import { api, updateDataFromServer } from './js/help'
var handleSubmit = async (event) => {
  event.preventDefault();
  let obj = {};
  for (const id of ["title", "txt"]) {
    obj[id] = inputs[id].value;
  }
  let results = await api(obj);
  await updateDataFromServer(results)
  modal.style.display = "none";
  
};
form.addEventListener("submit", handleSubmit);
