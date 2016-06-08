(function($) {

    SlideCrsl = PS.SlideCrsl = { // slide carousel
        init: function() {
        	SlideCrsl.n = {
	        	carousel: $('.carousel')
        	}
        	
        	SlideCrsl.sliding = false;
        
            SlideCrsl.events();
        },
        events: function() {
	        SlideCrsl.n.carousel.on('click', 'nav li', function(e) {
		        var carousel = $(event.target).parents('.carousel'),
		        	idx = $(this).index(),
		        	active = carousel.find('.slide.active'),
		        	nextSlide = carousel.find('.slide:nth-child(' + (idx + 1) + ')');
		        
		        SlideCrsl.carousel = carousel;
		        
		        if(active.index() > idx) {
			        SlideCrsl.slide('prev', nextSlide);
		        } else {
			        SlideCrsl.slide('next', nextSlide);
		        }	        
	        });
	        
	        SlideCrsl.n.carousel.swipe({
                swipeLeft: function(event, direction, distance, duration, fingerCount) {
                	var carousel = $(event.target).parents('.carousel'),
                		active = carousel.find('.slide.active'),
						nextSlide = (active.next().length > 0) ? active.next() : carousel.find('.slide:first-child');  
						
						
					SlideCrsl.carousel = carousel;		            	
                    SlideCrsl.slide('next', nextSlide);
                },
                swipeRight: function(event, direction, distance, duration, fingerCount) {
                	var carousel = $(event.target).parents('.carousel'),
                	active = carousel.find('.slide.active'),	
                	nextSlide = (active.prev().length > 0) ? active.prev() : carousel.find('.slide:last-child');
                	
                    SlideCrsl.slide('prev', nextSlide);
                },
                threshold: 100,
                excludedElements:[]});
        },
        slide: function(type, nextSlide) {
        	var carousel = SlideCrsl.carousel,
	        	nav = carousel.find('nav'),
	        	active = carousel.find('.slide.active'),
	        	direction = type == 'next' ? 'left' : 'right';
   
	        carousel.one('slid', function () {
	        	nav.find('.active').removeClass('active');
	        	var idx = carousel.find('.slide.active').index();
	        	$(nav.find('li')[idx]).addClass('active');
			});
	        	
	        nextSlide.addClass(type);	
	        nextSlide[0].offsetWidth;
	        active.addClass(direction);	 
	        nextSlide.addClass(direction);
	        
	        active.one('webkitTransitionEnd',   
				function(e) {
					nextSlide.removeClass([type, direction].join(' ')).addClass('active');
					active.removeClass(['active', type, direction].join(' '));
					
					setTimeout(function () { carousel.trigger('slid') }, 0);
			});
        }
    };
    
    SlideCrsl.init();

}) ( jQuery );