(function($) {
    
    // Modernizr.load
    Modernizr.load([
        {
            test: $('.form-main').length,
            yep: ['js/form.js']
        },
        {
            test: $('.svg .home').length,
            yep: ['js/libs/d3.v3.min.js', 'js/libs/jquery.touchSwipe.min.js', 'js/dial-nav.js', 'js/link-carousel.js']
        },
        {
            test: $('.no-svg .home').length,
            yep: ['js/libs/jquery.transform2d.js']
        },
        {
            test: $('.carousel').length,
            yep: ['js/libs/jquery.touchSwipe.min.js', 'js/slide-carousel.js']
        },
        {
            test: $('.vid-link').length,
            yep: ['js/video.js']
        }
    ]);

    PS = {
        windowEl: $(window),
        init: function() {
            
            // hamburger menu
            var overlay = $('#overlay'),
                menu = $('#menu'),
                menuClose = overlay.find('.close');

            menu.click( function(e) {
                overlay.show();
            });
            
            menuClose.click( function(e) {
                overlay.hide();
            });

            // search button
            var searchIcon = $('#search'),
                searchBar = $('#search-bar'),
                searchClear = searchBar.find('.clear');

            searchIcon.click( function(e) {
                searchBar.slideToggle();
            });
            
            searchClear.click( function(e) {
                searchBar.find('input').val('');
            });

        }
    };

    // RUN ON READY
    $(function(){
        
    });

    // RUN ON LOAD
    PS.windowEl.bind('load', function() {

    });

    // RUN ON RESIZE
    PS.windowEl.bind('resize', function () {
        
        if($('.home').length) {
            PS.Crsl.init(true);
        }
        
    });
    
    PS.init();

    // strip out the index number from a class or id name
    var getIndex = function(string) {
        return string.replace(/[^\d]/g, '');
    };

}) ( jQuery );