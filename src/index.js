var gapBetweenEach = 10;
var speedOfFade = 150;

$(document).ready(function() {

  $(".raptLogo").fadeIn(2000, function() {
    $('#logo').fadeIn(5000, function() {
      $('.fade-text').fadeIn(5000, function() {
        $('.fade-enter').fadeIn(3000);
      });
    });
  });



});
