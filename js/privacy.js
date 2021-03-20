fetch("./privacy_text.html")
  .then(response => {
    return response.text()
  })
  .then(data => {
    document.querySelector("#privacy_text").innerHTML = data;
  });
