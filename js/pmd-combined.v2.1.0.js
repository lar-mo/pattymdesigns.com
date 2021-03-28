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

    const pmd_api_url = 'https://api.pattymdesigns.com/wrapper/pmdv2ProdGetStrings/';
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
            expires.setHours(expires.getHours()+1);        // 1 hour - see line 124
            // expires.setDate(expires.getDate()+1);          // 1 day
            console.log(`last_modified ${last_modified}`);
            console.log(`expires ${expires}`);
            console.log(`now ${now}`);
            if (expires > now) {
              parseJson(local_storage_strings);
              console.log('Loading data from LocalStorage');
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
          expires.setHours(expires.getHours()+1);   // 1 hour - see line 83
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
        let json_strings = JSON.parse(ls_strings);
        var array = {};
        for (let i=0;i<json_strings.length;++i) {
          let location = json_strings[i].location;
          let string = json_strings[i].string;
          array[location] = string;
        }

        // update div contents
        document.querySelector(".large-image-text p:nth-of-type(2)").innerHTML = array["large_image_text_second_p"];
        document.querySelector(".large-image-text p:nth-of-type(3)").innerHTML = array["large_image_text_third_p"];
        document.querySelector(".about-shop-text  p:nth-of-type(1)").innerHTML = array["about_shop_text_first_p"];
        document.querySelector(".about-shop-text  p:nth-of-type(2)").innerHTML = array["about_shop_text_second_p"];
        document.querySelector(".about-me-text    p:nth-of-type(1)").innerHTML = array["about_me_text_first_p"];
        document.querySelector(".portfolio-grid   p:nth-of-type(1)").innerHTML = array["portfolio_grid_first_p"];
        document.querySelector(".portfolio-grid   p:nth-of-type(2)").innerHTML = array["portfolio_grid_second_p"];
        document.querySelector(".additional-info  p:nth-of-type(1)").innerHTML = array["additional_info_first_p"];
        document.querySelector(".additional-info  p:nth-of-type(2)").innerHTML = array["additional_info_second_p"];
        document.querySelector(".additional-info  p:nth-of-type(3)").innerHTML = array["additional_info_third_p"];
        document.querySelector(".additional-info  p:nth-of-type(4)").innerHTML = array["additional_info_fourth_p"];

        // change og:title
        $('meta[property="og:title"]').attr('content', array["og_title"]);
        // change og:description
        $('meta[property="og:description"]').attr('content', array["about_shop_text_first_p"]);
        // change meta description
        $('meta[name=description]').attr('content', array["about_shop_text_first_p"]);
        // change meta keywords
        $('meta[name=keywords]').attr('content', array["meta_keywords"]);

    }
