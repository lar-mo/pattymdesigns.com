# Floral Design Portfolio

## Website
* Originally developed the Layout in Dreamhost Remixer (soon defunct)
* Recreated in Javascript (vanilla, JQuery, formspree.io / formbutton, SwiperJS, Google Analytics)

### Mobile friendly
* smaller font, icons, spacing
* changes to flexbox alignment
* background attachment

### Features
* header wider and trasparent onload, gets smaller and opaque on scroll
* background is fixed on desktop, content slides over
* floral design grid is populated from flickr
  * images all have publish/upload in sequence
  * fetched with extras=date_upload
  * using axios for API interaction
  * throttled due to ordering issues
    * `setTimeout`
    * `async await Promise.all`
  * available-containers uses
    * `axios.all([getSizes(photo_id), getInfo(photo_id)]).then(axios.spread`
    * use `setTimeout` before rendering SwiperJS unit (due to loading issues)

### A/B testing
  * url parameters can be used to swap out elements
    * v1 - alternate porch image 1
    * v2 - alternate porch image 2
    * v2a - alternate porch image 2 but color corrected
    * v3 - original porch but new small image in about-shop
    * v4 - includes Available Containers widget (aka carousel)
    * v5 - includes a video widget (HTML5) in About Me
    * v6 - includes a map widget above Footer
    * spring - demos the promo link "/spring"

### Tracking
  * Adding Google Analytics 4
