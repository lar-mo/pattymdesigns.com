let flickr_url = 'https://api.flickr.com/services/rest/?'

function getSizes(photo_id) {
  let config = {
    params: {
      method: 'flickr.photos.getSizes',
      photo_id: photo_id,
      api_key: flickr_api_key,
      format: 'json',
      nojsoncallback: 1
    }, // end of 'params'
  } // end of 'config'
  return axios.get(flickr_url, config);
}

function getInfo(photo_id) {
  let config = {
    params: {
      method: 'flickr.photos.getInfo',
      photo_id: photo_id,
      api_key: flickr_api_key,
      format: 'json',
      nojsoncallback: 1
    }, // end of 'params'
  } // end of 'config'
  return axios.get(flickr_url, config);
}

async function fetchURLDescArrangements(photo_id,i) {
  const [url, info] = await Promise.all([getSizes(photo_id), getInfo(photo_id)])
      // Both requests are now complete
  var data = url.data;                                      // get data from api response
  if (data.stat !== 'ok') {
    console.log("error: getSizes API");
  }
  // console.log(data)

  var p_info = info.data;                                      // get data from api response
  if (p_info.stat !== 'ok') {
    console.log("error: getInfo API");
  }
  // console.log(info)

  // *** matt's code below ***
  let photo_size_array = data.sizes.size;
  let thumbnail_photo_url = photo_size_array[6].source;
  let original_photo_url = photo_size_array[photo_size_array.length-1].source;
  let original_photo_width = photo_size_array[photo_size_array.length-1].width;
  let original_photo_height = photo_size_array[photo_size_array.length-1].height;
  let photo_description = p_info.photo.description._content;

  // create elements
  let wrapper = document.createElement('div');
  let image_div = document.createElement('div');
  let img_element = document.createElement('img');
  let description_div = document.createElement('div');

  // set variables (class names)
  let div_id = 'flickr-image' + i   // for setAttribute on line 651
  let div_id2 = '#flickr-image' + i // for jquery hack on line 654

  // set attributes + values
  wrapper.setAttribute('class', 'image-container');
  img_element.setAttribute('src', thumbnail_photo_url);
  if (original_photo_width > original_photo_height) {
    img_element.setAttribute('class', 'thumbnail-short');
  } else {
    img_element.setAttribute('class', 'thumbnail-long');
  }
  img_element.setAttribute('alt', photo_description);
  description_div.setAttribute('id', div_id);
  $(document).ready(function(){
    $(div_id2).text(photo_description);       // syntax requires '#' (id) '.' (class)
  });

  image_div.appendChild(img_element);
  wrapper.appendChild(image_div);
  wrapper.appendChild(description_div);
  grid_container.appendChild(wrapper);

} // end of fetchURLDesc

function getArrangements() {
  // 72157718545940976 - PattyM Designs Flowers
  let config = {
    params: {
      method: 'flickr.photosets.getPhotos',
      user_id: '67858665@N00',
      photoset_id: '72157718545940976',
      api_key: flickr_api_key,
      format: 'json',
      nojsoncallback: 1,
      extras: 'date_upload',
    }, // end of 'params'
  } // end of 'config'
  axios.get(flickr_url, config)
  .then(function (response) {                                     // then do the cool stuff
    let data = response.data;                                      // get data from api response
    let photoset = data.photoset.photo;
    if (photoset.length == 0) {
      console.log("error: getArrangements API");
    }
    // https://stackoverflow.com/questions/3583724/how-do-i-add-a-delay-in-a-javascript-loop
    // Returns a Promise that resolves after "ms" Milliseconds
    const timer = ms => new Promise(res => setTimeout(res, ms))

    async function load () { // We need to wrap the loop into an async function for this to work
      for (let i=0; i<photoset.length; ++i) {
        let photo_id = photoset[i].id;
        fetchURLDescArrangements(photo_id,i);
        await timer(250); // then the created Promise can be awaited
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
