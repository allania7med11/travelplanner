import { tbody } from './elements'
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
const fields = [
  "name",
  "txt",
  "score_tag",
  "agreement",
  "subjectivity",
  "confidence",
  "irony",
];
const getdisplayInfos = (arr) => {
  let rtn = [];
  for (var i = arr.length - 1; i > -1; i--) {
    let elm = arr[i];
    rtn.push(fields.map((field) => elm[field]));
  }
  return rtn;
};
const gethtmlInfos = (arr) => {
  let rtn = [];
  for (var i = 0; i < arr.length; i++) {
    let elm = arr[i];
    rtn.push(`
      <tr id="info${i}">
        ${elm.map((cv) => `<td>${cv}</td>`).join("")}
      </tr>
    `);
  }
  rtn = rtn.join("");
  return rtn;
};
const updateDataFromServer = async (results) => {
  if (results.length > 0) {
    let displayInfo = getdisplayInfos(results);
    let htmlInfos = gethtmlInfos(displayInfo);
    tbody.innerHTML = htmlInfos;
  }
};
export { api, updateDataFromServer }