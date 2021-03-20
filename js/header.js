fetch("./header.html")
  .then(response => {
    return response.text()
  })
  .then(data => {
    document.querySelector("#header").innerHTML = data;
    var path = window.location.pathname;
    var page = path.split("/").pop();
    if (page == 'privacy.html') {
      $('#header-link-about-shop').attr('href','index.html#about-shop');
      $('#header-link-about-me').attr('href','index.html#about-me');
      $('#header-link-portfolio').attr('href','index.html#portfolio');
      $('#header-link-contact').css('display','none');
    }
  });

// $(document).ready(function() {
//     $("#header").load("header.html");
//     var path = window.location.pathname;
//     var page = path.split("/").pop();
//     if (page == 'privacy.html') {
//       $('#header-link-about-shop').attr('href','index.html#about-shop');
//       $('#header-link-contact').css('display','none');
//     }
// });
