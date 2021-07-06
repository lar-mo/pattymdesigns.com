let url_arg = window.location.search.substring(1);

$(document).ready(function() {
  if (url_arg == 'es') {
    $('.center-text a').attr("href","privacy.html?es");
    $(lang_label).text("Español");
    $("#es_option").css("display","none");
  }
  else if (url_arg == 'fr') {
    $('.center-text a').attr("href","privacy.html?fr");
    $(lang_label).text("Français");
    $("#fr_option").css("display","none");
  }
  else if (url_arg == 'de') {
    $('.center-text a').attr("href","privacy.html?de");
    $(lang_label).text("Deutsche");
    $("#de_option").css("display","none");
  }
  else {
    $(lang_label).text("English");
    $("#en_option").css("display","none");
  }
});

let local_storage_strings = localStorage.getItem('all_pmd_strings');
$('.dropdown-content a:nth-of-type(1)').click(function(){
  // lang = 'en';
  $('.center-text a').attr("href","privacy.html");
  window.history.replaceState(null, null, "?en");
  $(lang_label).text('English');
  $("#en_option").css("display","none");
  $("#es_option").css("display","block");
  $("#fr_option").css("display","block");
  $("#de_option").css("display","block");
  getStringsFromLocalStorage();
  loadFormbutton();
})
$('.dropdown-content a:nth-of-type(2)').click(function(){
  // lang = 'es';
  $('.center-text a').attr("href","privacy.html?es");
  window.history.replaceState(null, null, "?es");
  $(lang_label).text('Español');
  $("#en_option").css("display","block");
  $("#es_option").css("display","none");
  $("#fr_option").css("display","block");
  $("#de_option").css("display","block");
  getStringsFromLocalStorage();
  loadFormbutton();
})
$('.dropdown-content a:nth-of-type(3)').click(function(){
  // lang = 'fr';
  $('.center-text a').attr("href","privacy.html?fr");
  window.history.replaceState(null, null, "?fr");
  $(lang_label).text('Français');
  $("#en_option").css("display","block");
  $("#es_option").css("display","block");
  $("#fr_option").css("display","none");
  $("#de_option").css("display","block");
  getStringsFromLocalStorage();
  loadFormbutton();
})
$('.dropdown-content a:nth-of-type(4)').click(function(){
  // lang = 'de';
  $('.center-text a').attr("href","privacy.html?de");
  window.history.replaceState(null, null, "?de");
  $(lang_label).text('Deutsche');
  $("#en_option").css("display","block");
  $("#es_option").css("display","block");
  $("#fr_option").css("display","block");
  $("#de_option").css("display","none");
  getStringsFromLocalStorage();
  loadFormbutton();
})
