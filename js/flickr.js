let api_wrapper_url = 'https://api.pattymdesigns.com/wrapper';
var flickrLoaded = false;

function getSizes(photo_id) {
  let method = "flickrApiGetSizes";
  let url = `${api_wrapper_url}/${method}/${photo_id}/`;
  return axios.get(url);
}

function getInfo(photo_id) {
  let method = 'flickrApiGetInfo';
  let url = `${api_wrapper_url}/${method}/${photo_id}/`;
  return axios.get(url);
}

async function fetchURLDescArrangements(photo_id,i) {
  const [url, info] = await Promise.all([getSizes(photo_id), getInfo(photo_id)])
  var photo_sizes = url.data;
  if (url.length == 0) {
    console.log("error: getSizes API");
  }
  var photo_info = info.data;
  if (info.length == 0) {
    console.log("error: getInfo API");
  }

  // set variables from API response
  let thumbnail_photo_url = photo_sizes.thumb.url;
  let original_photo_url = photo_sizes.full.url;
  let original_photo_width = photo_sizes.full.width;
  let original_photo_height = photo_sizes.full.height;
  let photo_title = photo_info.photo.title;
  let photo_desc = photo_info.photo.description;

  // create elements
  let wrapper = document.createElement('div');
  let image_div = document.createElement('div');
  let a_element = document.createElement('a');
  let img_element = document.createElement('img');
  let description_div = document.createElement('div');

  // set variables (class names)
  let div_id = 'flickr-image' + i   // for setAttribute on line 651
  let div_id2 = '#flickr-image' + i // for jquery hack on line 654

  // set attributes + values
  wrapper.setAttribute('class', 'image-container');
  a_element.setAttribute('class', 'lightbox');
  a_element.setAttribute('href', original_photo_url);
  img_element.setAttribute('src', thumbnail_photo_url);
  if (original_photo_width >= original_photo_height) {
    img_element.setAttribute('class', 'thumbnail-short');
  } else {
    img_element.setAttribute('class', 'thumbnail-long');
  }
  img_element.setAttribute('alt', photo_desc);
  description_div.setAttribute('id', div_id);
  $(document).ready(function(){
    $(div_id2).text(photo_desc);       // syntax requires '#' (id) '.' (class)
  });

  a_element.appendChild(img_element);
  image_div.appendChild(a_element);
  wrapper.appendChild(image_div);
  wrapper.appendChild(description_div);
  grid_container.appendChild(wrapper);

} // end of fetchURLDescArrangements

function getArrangements() {
  let method = 'flickrApiGetArrangements';
  let url = `${api_wrapper_url}/${method}/`;
  axios.get(url)
  .then(function (response) {                                     // then do the cool stuff
    let arrangements = response.data;                                      // get data from api response
    if (arrangements.length == 0) {
      console.log("error: getArrangements API");
    }
    // https://stackoverflow.com/questions/3583724/how-do-i-add-a-delay-in-a-javascript-loop
    // Returns a Promise that resolves after "ms" Milliseconds
    const timer = ms => new Promise(res => setTimeout(res, ms))

    async function load () { // We need to wrap the loop into an async function for this to work
      for (let i=0; i<arrangements.length; ++i) {
        let arrangement = arrangements[i];
        fetchURLDescArrangements(arrangement,i);
        await timer(250);                       // then, the created Promise can be awaited
        if (arrangements.length - 1 === i) {        // update 'flickrLoaded' var to 'true' when loop is done
          flickrLoaded = true;
        }
      }
    }
    load();

  })
  .catch(err => {
      console.log(err);
      console.log("Using fallback grid images")
      $('.image-container').removeClass("fallback-images");
  })
} // end of getArrangements
getArrangements();
