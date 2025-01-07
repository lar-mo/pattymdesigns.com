# Floral Design Portfolio

Updates: [March 2021 ↓](#march-2021---major-update)

## Website
* Originally developed the Layout in Dreamhost Remixer (soon defunct)
* Recreated in Javascript (vanilla, JQuery, formspree.io / formbutton, SwiperJS, Google Analytics)

### Mobile friendly
* smaller font, icons, spacing
* changes to flexbox alignment
* background attachment

### Features
* header larger and transparent onload, gets smaller and opaque on scroll
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

## March 2021 - Major update

### New API serves Strings for website (developed with Django REST Framework)
  * Restricted access via API Key and Authenticated Users (r/w) or Anon (r/o).
  * Versioning (kludgy) is done by replicating views, serializers, urls.
  * v1/v2 - string only; v3 - string_en, string_es, string_fr, string_de
  * Data is saved in LocalStorage for up to one hour.

### All API calls (Flickr, Blogger, PMD Strings) are proxied
  * Uses Django app to proxy each 3rd party (and 1st party) API calls.
  * Db info, secrets, API keys are all hidden.
  * Front-end uses parses same JSON object so no code changes were required.

### Improved Front-end code for dynamic insertion of Strings
  * Previously, individual `<p>` tags were populated which made assignment very brittle.
  * Now, all text for a section is stored in the `string` variable (key).
  * Note: "Strings" is inaccurate as it now includes images & videos (soon) but has dual benefits:
    * Easily edit images shown in sections (w/o having to update front-end code)
    * Include translated text as image ALT tags

### Multi-language Support
  * New Strings API allows for storing translated strings.
  * Site now can be displayed in English (default), Spanish (es), French (fr), German (de).
  * Non-English text was translated via Google Translate and input via Admin Panel (pseudo CMS).

### Other improvements
  * Most error conditions should be handled; static content served (try/catch, async/await).
  * https://api.pattymdesigns.com is served through Cloudflare (API and wrapper).
  * Logging: I'm trying out LogRocket to get more insight into site performance and user behavior.

### Known Issues
  * If Strings API is down on a user's first visit, the UX will be poor.
    * The fallback to LocalStorage only works _after_ the first visit.
  * 1 hour "cache" (LocalStorage) might cause unintended issues.
    * This could be mitigated by using Cloudflare's Purge Browser cache feature after a release (CSS/JS).

...
