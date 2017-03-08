$(document).ready(function() {

  $('#mobile-nav-example .hamburger-2').click(function() {
    $('#mobile-nav-example .flyout').show();
    $('#mobile-nav-example').css({'z-index': '1'});
    $('#mobile-nav-example .flyout').css({'height': '500px'});
  });
  $('#mobile-nav-drop-example .hamburger-2').click(function() {
    $('#mobile-nav-drop-example .flyout').show();
    $('#mobile-nav-drop-example').css({'z-index': '1'});
    $('#mobile-nav-drop-example .flyout').css({'height': '500px'});
  });
  // $('.close').click(function() {
  //   $('.flyout').hide();
  //   $('body').css({'overflow': 'auto'});
  // });
  // $('.fly-dropdown').click(function() {
  //   $(this).children('.dropdown-menu').fadeToggle();
  // });
  // $('.sub-fly-dropdown').hover(function() {
  //   $(this).children('.sub-dropdown-menu').fadeToggle();
  // });


});
