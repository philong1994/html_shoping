jQuery(document).ready(function($) {
	$('.deals-horizontal-list').owlCarousel({
        items: 4,
        loop: true,
        margin: 30,
        responsiveClass: true,
        navText: ['', ''],
        nav: false,
        autoplay:true,
        autoplayTimeout:4000,
        responsive: {
            0: {
                items: 1,
                nav: false
            },
            480: {
                items: 2,
                nav: false
            },
            1000: {
                items: 3,
                nav: false
            },
            1199: {
                items: 4,
                nav: false
            }
        }
    });
    $('.deals-horizontal-list1').owlCarousel({
        items: 4,
        loop: true,
        margin: 30,
        responsiveClass: true,
        navText: ['', ''],
        nav: false,
        autoplay:true,
        autoplayTimeout:4000,
        responsive: {
            0: {
                items: 1,
                nav: false
            },
            480: {
                items: 2,
                nav: false
            },
            1000: {
                items: 3,
                nav: false
            },
            1199: {
                items: 4,
                nav: false
            }
        }
    });
    $('.deals-horizontal-list2').owlCarousel({
        items: 8,
        loop: true,
        margin: 0,
        responsiveClass: true,
        navText: ['', ''],
        nav: false,
        autoplay:true,
        autoplayTimeout:4000,
        responsive: {
            0: {
                items: 3,
                nav: false
            },
            480: {
                items: 4,
                nav: false
            },
            1000: {
                items: 6,
                nav: false
            },
            1199: {
                items: 8,
                nav: false
            }
        }
    });
    $('.banner-slider-main').bxSlider({
        mode: 'fade',
        infiniteLoop: true,
        controls: true,
        captions: true,
        auto: true
    });

    var magnificInstance = true;
    var magnificItem = 0;
    $('.fancybox-large').on('click', function(event) {
        magnificInstance = true;
        magnificItem = $('.owl-carousel-thumbnails .active').index();
        $('.fancybox').magnificPopup({
            type: 'image',
            gallery: {
                enabled: true
            },
            disableOn: function() {
                return magnificInstance;
            }
        }).magnificPopup('open', magnificItem);
    });
    $('.fancybox').on('click', function(ev) {
        ev.preventDefault();
        $('.owl-carousel-thumbnails .item').removeClass('active');
        var target = ev.currentTarget;
        $(target).parent('.item').addClass('active');
        var large_img = $(target).find('img').attr('src');
        $('.fancybox-large').find('img').attr('src', large_img);
        magnificItem = $(target).parents('.item').index();
        magnificInstance = false;
    });

    $('ul.tabs li').click(function(){
        var tab_id = $(this).attr('data-tab');

        $('ul.tabs li').removeClass('current');
        $('.tab-content').removeClass('current');

        $(this).addClass('current');
        $("#"+tab_id).addClass('current');
    })
      $('.navbar-toggle').click(function() {

      $( "#navbar" ).slideToggle( "slow", function() {
        
      });
      });
});