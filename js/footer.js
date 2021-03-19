fetch("./footer.html")
  .then(response => {
    return response.text()
  })
  .then(data => {
    document.querySelector("#footer").innerHTML = data;
      var path = window.location.pathname;
      var page = path.split("/").pop();
      if (page == 'privacy.html') {
        $('#footer-link-privacy').css('display','none');
      }
  });
// $(function(){
//   $("#footer").load("footer.html");
// });
