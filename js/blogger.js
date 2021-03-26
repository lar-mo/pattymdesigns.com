let bloggerv3_url = 'https://www.googleapis.com/blogger/v3/blogs/6624714559657687469/posts?'
  function getLatestPost() {
    // 5929721860344397604 - https://roadtripsandhikes.blogspot.com
    // 6624714559657687469 - https://pattymdesigns.blogspot.com
    let config = {
      params: {
        key: blogger_apiv3,
        fetchBodies: true,
        fetchImages: true,
        maxResults: 1,
        orderBy: 'PUBLISHED',
      }, // end of 'params'
    } // end of 'config'
    axios.get(bloggerv3_url, config)
    .then(function (response) {                                     // then do the cool stuff
      let data = response.data.items[0];                                      // get data from api response
      let image_url = data.images[0].url;
      let post_body = data.content;
      let post_title = data.title;
      let post_published = JSON.stringify(data.published).slice(1,11);
      let post_url = data.url;
      // console.log(data);
      // console.log(data.url);
      // console.log(data.title);
      // console.log(post_published);
      // console.log(data.images[0].url);
      // console.log(response.status);
      // console.log(response.statusText);
      // console.log(response.headers);
      // console.log(response.config);
      var date_pub = new Date(post_published);
      var month = date_pub.getMonth();
      var months = {
        0: "January",
        1: "Februrary",
        2: "March",
        3: "April",
        4: "May",
        5: "June",
        6: "July",
        7: "August",
        8: "September",
        9: "October",
        10: "November",
        11: "December"
      };
      var date = date_pub.getUTCDate();
      var year = date_pub.getFullYear();
      var date_pub_mmddyy = `${months[month]} ${date}, ${year}`;

      let post_wrapper = document.createElement('div');
      post_wrapper.setAttribute('class', "post_wrapper");

      let desc_div = document.createElement('div');
      desc_div.setAttribute('class', "post_desc");

      let post_title_div = document.createElement('div');
      post_title_div.setAttribute('class', "post_title");
      post_title_div.innerHTML += "<h2>" + post_title + "</h2>";
      desc_div.appendChild(post_title_div);

      let pub_date_read_more_div = document.createElement('div');
      pub_date_read_more_div.setAttribute('class', "pub_date_read_more");

      let pub_date = document.createElement('span');
      pub_date.setAttribute('class', "pub_date");
      pub_date.innerHTML += "<b>Published</b>: " + date_pub_mmddyy;
      pub_date_read_more_div.appendChild(pub_date);

      let read_more = document.createElement('span');
      read_more.setAttribute('class', "read_more");
      read_more.innerHTML += "<a href='" + post_url + "' target='_blank'>Read More</a>";
      pub_date_read_more_div.appendChild(read_more);
      // desc_div.innerHTML += "<div>" + post_body + "</div>";

      desc_div.appendChild(pub_date_read_more_div);

      let img_div = document.createElement('div');
      img_div.setAttribute('class', "post_img");

      let img_element = document.createElement('img');
      img_element.setAttribute('src', image_url);

      img_div.appendChild(img_element);
      post_wrapper.appendChild(desc_div);
      post_wrapper.appendChild(img_div);
      blog_container.appendChild(post_wrapper);
    });
  }
