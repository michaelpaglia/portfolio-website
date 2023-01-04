$(document).ready(function() {
   let $btns = $('.project-area .button-group button');

   $btns.click(function(e) {
    $('.project-area .button-group buttons').removeClass('active');
    e.target.classList.add('active');
    let selector = $(e.target).attr('data-filter');
    $('.project-area .grid').isotope({
        filter : selector
    });

    return false;
   })
   
   $('.project-area.button-group #btn1').trigger('click');

   $('.project-area .grid .test-popup-link').magnificPopup({
    type: 'image',
    gallery: { enabled: true }
    });
    

    // Sticky navigation
    let nav_offset_top = $('.header_area').height() + 50;
    function navFixed() {
        if($('.header_area').length) {
            $(window).scroll(function() {
                let scroll = $(window).scrollTop();
                if(scroll >= nav_offset_top) {
                    $('.header_area .main-menu').addClass('navFixed');
                } else {
                    $('.header_area .main-menu').removeClass('navFixed');
                }
            })
        }
    }

    navFixed();
});