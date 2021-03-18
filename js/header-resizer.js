// When the user scrolls down 50px from the top of the document, resize the header's font size
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
