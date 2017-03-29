$(document).ready(function() {

  //=================Animation functionality=============//
  function animations() {
    $(window).scroll( function(){  /* Every time the window is scrolled ... */

      /* Check the location of each animate-in elements */
      $('.animate-in').each( function(){
        var objectBottom = $(this).offset().top + $(this).outerHeight();
        var windowBottom = $(window).scrollTop() + $(window).height();

        /* If the object is completely visible in the window, fade it it */
        if (objectBottom < windowBottom) { //object comes into view (scrolling down)
          if ($(this).css("opacity")==0) {$(this).fadeTo(500,1);}
        } else { //object goes out of view (scrolling up) fade out
          if ($(this).css("opacity")==1) {$(this).fadeTo(500,0);}
        }
      });
    });
  }

  //=================Mobile menu functionality=============//
  function mobileMenu() {
    $('.hamburger').click(function() {
      $('.flyout').show();
      $('body').css({'overflow': 'hidden'});
    });
    $('.close').click(function() {
      $('.flyout').hide();
      $('body').css({'overflow': 'auto'});
    });
    $('.fly-dropdown').click(function() {
      $(this).children('.dropdown-menu').fadeToggle();
    });
    $('.sub-fly-dropdown').hover(function() {
      $(this).children('.sub-dropdown-menu').fadeToggle();
    });
  }


  // ================Slideshow Functionality ================//
function heroSlideshow() {
    var totalImages = $(".images").children().length; // # of total slideshow images
    var imageCounter = $(".images").children().length; // keeps track of current image
    var interval = null;
      function startSlideshow() { interval = setInterval(function() {
      var photoNumber = parseInt($(".images .active").attr('class')); // active photo
      $(".images img").removeClass("active");
      if (photoNumber < totalImages) {
        imageCounter = photoNumber + 1;
        $(".images img:nth-child("+imageCounter+")").addClass("active");
      } else if (photoNumber === totalImages) {
        imageCounter = 1;
        $(".images img:nth-child("+imageCounter+")").addClass("active");
      } else {
        imageCounter += 1;
        $(".images img:nth-child("+imageCounter+")").addClass("active");
      }
      photoNumber += 1;
      $(".circle").removeClass("active");
      $(".circle:nth-child("+imageCounter+")").addClass("active");
    }, 5000); } //change slideshow time interval here

    function stopSlideshow() { clearInterval(interval)}

    startSlideshow();
    $('.left-arrow').click(function(){
      stopSlideshow();
      var photoNumber = parseInt($(".images .active").attr('class')); // active photo
      $(".circle").removeClass("active");
      $(".images img").removeClass("active");
      if (photoNumber===1) {
        imageCounter = $(".images").children().length;
        $(".images img:nth-child("+imageCounter+")").addClass("active");
      } else {
        imageCounter -= 1;
        $(".images img:nth-child("+imageCounter+")").addClass("active");
      }
      $(".circle:nth-child("+imageCounter+")").addClass("active");
      startSlideshow();
    });

    $('.right-arrow').click(function(){
      stopSlideshow();
      var photoNumber = parseInt($(".images .active").attr('class')); // active photo
      $(".circle").removeClass("active");
      $(".images img").removeClass("active");
      if (photoNumber < totalImages) {
        imageCounter = photoNumber + 1;
        $(".images img:nth-child("+imageCounter+")").addClass("active");
      } else if (photoNumber === totalImages) {
        imageCounter = 1;
        $(".images img:nth-child("+imageCounter+")").addClass("active");
      } else {
        imageCounter += 1;
        $(".images img:nth-child("+imageCounter+")").addClass("active");
      }
      $(".circle:nth-child("+imageCounter+")").addClass("active");
      startSlideshow();
    });
    $(".circle").click(function(){
      stopSlideshow();
      var circleNumber = $(this).attr('class').replace(/[^\d]/g, ""); // clicked circle
      $(".circle").removeClass("active");
      $(this).addClass("active");
      $(".images img").removeClass("active");
      $(".images img:nth-child("+circleNumber+")").addClass("active");
      imageCounter = circleNumber;
      startSlideshow();
    });
  }

  // ================ScrollSpy Functionality ================//

  function scrollSpy() {
    var vars = {};
    var sectionNumber = $('[id*="section"]').find().prevObject.length; //counts stages on each page
    for (var i = 1; i <= sectionNumber; i++) { //creates variable for each stage
      vars['sectionTop' + i] = $('#section' + i).offset().top;
    }
    function scrollSpyWatch() {
      var windowTop = $(window).scrollTop() + 350;
      for (var j = 1; j <= sectionNumber; j++) {
        if (windowTop >= (vars['sectionTop'+j]) && windowTop < (vars['sectionTop'+(j+1)])) {
          $('[id*="scrollSpy"]').removeClass('active');
          $('#scrollSpy'+j).addClass('active');
        } else if (windowTop >= (vars['sectionTop'+sectionNumber])){
          $('[id*="scrollSpy"]').removeClass('active');
          $('#scrollSpy'+sectionNumber).addClass('active');
        }
      };
    }
    scrollSpyWatch(); //calls function on page load
    $(window).scroll(function() { //calls function on scroll
      scrollSpyWatch();
    });

    //smooth scrolls to different stages on page
    $('[id*="scrollSpy"]').click(function() { /* class or id of button/link that will be clicked */
      var number = this.id.replace(/\D+/g, '');
        $('html, body').animate({
            scrollTop: $("#section" + number).offset().top, /* class or id of div that will be scrolled to */
            behavior: 'smooth',
        }, 1000);
    });
  }


////////// Add Functions to Call HERE//////////
  heroSlideshow();
  mobileMenu();
  animations();
  scrollSpy();
  
});
