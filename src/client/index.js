console.log("Never Give Up Ahmed");
let api = async () => {
  let obj = {
    name: "John",
    txt: "Enjoyed staying: location is great, not far from a subway station and only 15 minutes ride from all the sights. There are lots of restaurants and shops nearby. Cheerful and welcoming atmosphere. Thanks for the hospitality.",
  };

  let response = await fetch("/data", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(obj),
  });

  let result = await response.json();
  console.log(result);
};
api()