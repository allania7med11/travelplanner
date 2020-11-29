console.log("Never Give Up Ahmed");
var form = document.getElementById("form");
var inputs = {
  title: document.getElementById("title"),
  txt: document.getElementById("txt"),
};
var resultsDiv = document.getElementById("results");
let api = async (obj) => {
  let response = await fetch("/data", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(obj),
  });

  let result = await response.json();
  return result;
};
var handleSubmit = async (event) => {
  debugger;
  event.preventDefault();
  let obj = {};
  for (const id of ["title", "txt"]) {
    obj[id] = inputs[id].value;
  }
  let results = await api(obj);
  console.log(results)
  resultsDiv.innerHTML = JSON.stringify(results);
};

form.addEventListener("submit", handleSubmit);
