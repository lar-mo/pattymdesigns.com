window.onscroll = function() {scrollFunction()};
  function scrollFunction() {
  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    $('#header').css('padding','0px');
    $('#header').css('box-shadow',        '0 10px 30px 5px rgba(25,25,25,0.6)');
    $('#header').css('-moz-box-shadow',   '0 10px 30px 5px rgba(25,25,25,0.6)');
    $('#header').css('-webkit-box-shadow','0 10px 30px 5px rgba(25,25,25,0.6)');
  } else {
    if (window.innerWidth > 800) {
      $('#header').css('padding','24px');
      $('#header').css('box-shadow','');
      $('#header').css('-moz-box-shadow','');
      $('#header').css('-webkit-box-shadow','');
    } else if (window.innerWidth > 576 && window.innerWidth < 801) {
      $('#header').css('padding','10px');
      $('#header').css('box-shadow','');
      $('#header').css('-moz-box-shadow','');
      $('#header').css('-webkit-box-shadow','');
    } else if (window.innerWidth > 501 && window.innerWidth < 575) {
      $('#header').css('padding','5px');
      $('#header').css('box-shadow','');
      $('#header').css('-moz-box-shadow','');
      $('#header').css('-webkit-box-shadow','');
    } else if (window.innerWidth < 500) {
      $('#header').css('padding','0px');
      $('#header').css('box-shadow','');
      $('#header').css('-moz-box-shadow','');
      $('#header').css('-webkit-box-shadow','');
    } else {
      $('#header').css('padding','0px');
      $('#header').css('box-shadow','');
      $('#header').css('-moz-box-shadow','');
      $('#header').css('-webkit-box-shadow','');
    }
  }
}

$(window).scroll(function(){
  $("#header").css("background-color", 'rgba(81,81,81,' + (0.7 + $(window).scrollTop() / 300) + ')');
});

const cachebuster = Math.floor(Date.now() / 1000);
const pmd_api_url = 'https://api.pattymdesigns.com/wrapper/pmdv3ProdGetStrings/?'+cachebuster;
// const pmd_api_url = 'http://localhost:8000/wrapper/pmdv3DevGetStrings/?'+cachebuster;
var now = new Date();

function getStringsFromLocalStorage() {
    var local_storage_strings = localStorage.getItem('all_pmd_strings');
    try {
      if (local_storage_strings) {
        // check date and refresh if expired
        var last_modified = window.localStorage.dateTimeStamp;
        var expires = new Date(last_modified);
        // expires.setSeconds(expires.getSeconds()+1);   // 1 seconds
        // expires.setSeconds(expires.getSeconds()+60);   // 60 seconds
        expires.setHours(expires.getHours()+1);        // 1 hour - see line 95
        // expires.setDate(expires.getDate()+1);          // 1 day
        console.log(`last_modified ${last_modified}`);
        console.log(`expires ${expires}`);
        console.log(`now ${now}`);
        if (expires > now) {
          parseJson(local_storage_strings);
          console.log('Loading data from Local Storage');
        }
        else {
          getStringsFromApi(local_storage_strings);
          console.log("Expired: Fetch from Api");
        }
      }
      else {
        getStringsFromApi(local_storage_strings);
        console.log("First Visit: Fetch from Api");
      }
    }
    catch(err) {
      getStringsFromApi(local_storage_strings);
      console.error("Error: Fetch from Api");
    }
}

var getStringsFromApi = async function(local_storage_strings) {
    const response = await axios.get(pmd_api_url)
    .catch((error) => {
        console.error("Error: Unable to reach Api");
        console.error(error);
        console.log("Loading stale data from Local Storage");
        parseJson(local_storage_strings);
    })
    if (response.data[0]) {
      let resp = JSON.stringify(response.data);
      parseJson(resp);
      console.log("Loading data from Api")
      saveStringsToLocalStorage(resp);
      window.localStorage.dateTimeStamp = now;
      console.log(`new timestamp ${now}`)
      var expires = new Date(now);
      expires.setHours(expires.getHours()+1);   // 1 hour - see line 54
      console.log(`expires ${expires}`)
    } else {
      console.error("API returned error. No data in LocalStorage.");
      console.error(`Error: ${response.data["detail"]}`)
    }
}

function saveStringsToLocalStorage(data) {
    const data_json = JSON.parse(data);
    localStorage.setItem('all_pmd_strings', data);
}

function parseJson(ls_strings) {
    let url_arg = window.location.search;
    let json_strings = JSON.parse(ls_strings);
    var array = {};
    for (let i=0;i<json_strings.length;++i) {
      let location = json_strings[i].location;
      if (url_arg == '?es') {
        var string = json_strings[i].string_es;
      } else if (url_arg == '?fr') {
        var string = json_strings[i].string_fr;
      } else if (url_arg == '?de') {
        var string = json_strings[i].string_de;
      } else {
        var string = json_strings[i].string_en;
      }
      array[location] = string;
    }

    // update div contents
    try {
      if (privacy) {
        document.querySelector("#header-link-about-shop").innerHTML = array["header_link_about_shop"];
        document.querySelector("#header-link-about-me").innerHTML   = array["header_link_about_me"];
        document.querySelector("#header-link-portfolio").innerHTML  = array["header_link_portfolio"];
      }
    }
    catch {

      try { document.querySelector("#header-link-about-shop").innerHTML   = array["header_link_about_shop"]; }
      catch { console.error('Missing: ID #header-link-about-shop') }

      try { document.querySelector("#header-link-about-me").innerHTML     = array["header_link_about_me"]; }
      catch { console.error('Missing: ID #header-link-about-me') }

      try { document.querySelector("#header-link-portfolio").innerHTML    = array["header_link_portfolio"]; }
      catch { console.error('Missing: ID #header-link-portfolio') }

      try { document.querySelector("#header-link-contact").innerHTML      = array["header_link_contact"]; }
      catch { console.error('Missing: ID #header-link-contact') }

      try { document.querySelector("#pancake-link-about-shop").innerHTML  = array["header_link_about_shop"]; }
      catch { console.error('Missing: ID #pancake-link-about-shop') }

      try { document.querySelector("#pancake-link-about-me").innerHTML    = array["header_link_about_me"]; }
      catch { console.error('Missing: ID #pancake-link-about-me') }

      try { document.querySelector("#pancake-link-portfolio").innerHTML   = array["header_link_portfolio"]; }
      catch { console.error('Missing: ID #pancake-link-portfolio') }

      try { document.querySelector("#pancake-link-contact").innerHTML     = array["header_link_contact"]; }
      catch { console.error('Missing: ID #pancake-link-contact') }

      try { document.querySelector(".hero-subtitle").innerHTML            = array["hero_subtitle"]; }
      catch { console.error('Missing: Class .hero-subtitle') }

      try { document.querySelector(".large-image-text").innerHTML         = array["large_image"]; }
      catch { console.error('Missing: Class .large-image-text') }

      try { document.querySelector(".large-image-img").innerHTML          = array["large_image_img"]; }
      catch { console.error('Missing: Class .large-image-img') }

      try { document.querySelector(".about-shop-image").innerHTML         = array["about_shop_image"]; }
      catch { console.error('Missing: Class .about-shop-image') }

      try { document.querySelector(".about-shop-text").innerHTML          = array["about_shop"]; }
      catch { console.error('Missing: Class .about-shop-text') }

      try { document.querySelector(".about-me-text").innerHTML            = array["about_me"]; }
      catch { console.error('Missing: Class .about-me-text') }

      try { document.querySelector("#portfolio-grid-desc").innerHTML      = array["portfolio_grid"]; }
      catch { console.error('Missing: ID #portfolio-grid-desc') }

      try { document.querySelector("#portfolio-containers").innerHTML     = array["portfolio_containers"]; }
      catch { console.error('Missing: ID #portfolio-containers') }

      try { document.querySelector("#latest-blog-header").innerHTML       = array["latest_blog_header"]; }
      catch { console.error('Missing: ID #latest-blog-header') }

      try { document.querySelector("#header-link-special").innerHTML      = array["header_link_special"]; }
      catch { console.error('Missing: ID #header-link-special') }

      try { document.querySelector(".featured-item-image").innerHTML      = array["featured_item_image"]; }
      catch { console.error('Missing: Class .featured-item-image') }

      try { document.querySelector(".featured-item-text").innerHTML       = array["featured_item_text"]; }
      catch { console.error('Missing: Class .featured-item-text') }

    }

    // change og:title
    $('meta[property="og:title"]').attr('content', array["og_title"]);
    // change og:description
    $('meta[property="og:description"]').attr('content', array["og_description"]);
    // change meta description
    $('meta[name=description]').attr('content', array["og_description"]);
    // change meta keywords
    $('meta[name=keywords]').attr('content', array["meta_keywords"]);

}

function openNav() {
  document.getElementById("mobile_nav").style.width = "100%";
}

function closeNav() {
  document.getElementById("mobile_nav").style.width = "0%";
}
