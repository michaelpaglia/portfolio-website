$(document).ready(function() {
    let $btns = $('.project-area .button-group button');

    $btns.on('click', function(e) {
        $('.project-area .button-group button').removeClass('active');
        $(e.target).addClass('active');

        let filterValue = $(e.target).attr('data-filter');
        if (filterValue === '*') {
            $('.project-area .list-group-item').show();
        } else {
            $('.project-area .list-group-item').each(function() {
                let item = $(this);
                if (item.hasClass(filterValue.substring(1))) {
                    item.show();
                } else {
                    item.hide();
                }
            });
        }

        return false; // Prevent default action
    });

    // Trigger click on 'All' button to show all projects on page load
    $('.project-area .button-group #btn1').trigger('click');

    $('.project-area .grid .test-popup-link').magnificPopup({
        type: 'image',
        gallery: { enabled: true }
    });

    let nav_offset_top = $('.header_area').height() + 50;
    function navFixed() {
        if ($('.header_area').length) {
            $(window).scroll(function() {
                let scroll = $(window).scrollTop();
                if (scroll >= nav_offset_top) {
                    $('.header_area .main-menu').addClass('navFixed');
                } else {
                    $('.header_area .main-menu').removeClass('navFixed');
                }
            });
        }
    }
    navFixed();
});