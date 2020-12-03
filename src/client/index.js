import { form, inputs } from './elements'
import { api, updateDataFromServer } from './help'
var handleSubmit = async (event) => {
  debugger
  event.preventDefault();
  let obj = {};
  for (const id of ["title", "txt"]) {
    obj[id] = inputs[id].value;
  }
  let results = await api(obj);
  updateDataFromServer(results)
  
};
form.addEventListener("submit", handleSubmit);
