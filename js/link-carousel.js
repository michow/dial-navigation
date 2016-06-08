(function($) {

    Crsl = PS.Crsl = { // solutions carousel
        init: function(resize) {
            // init variables
            var listWrap = $('#solutions-carousel'),
                list = listWrap.find('ul');
            Crsl.totalItems = list.children().length;
            Crsl.widthItem = list.find('li').outerWidth();
            Crsl.widthView = PS.windowEl.width();

            // load controls and set list width
            $('.control').show();
            list.css({'width': Crsl.totalItems * Crsl.widthItem + 'px'});

            // move last 2 items to front to show infinite carousel
            if(!resize) {
                list.find('li:first').before(list.find('li:last'));
                list.find('li:first').before(list.find('li:last'));
            }

            // update left position to show the original first list element
            Crsl.offset = -(Crsl.widthItem - (Crsl.widthView - Crsl.widthItem) / 2) - Crsl.widthItem;
            list.animate({'left': Crsl.offset + 'px'}, 300);

            $('.control').click(function(e) {
                e.preventDefault();

                if(list.is(':animated')) {
                    return false;
                }
                else if($(this).hasClass('prev')) {
                    Crsl.slide('prev', true);
                }
                else {
                    Crsl.slide('next', true);
                }
            });

            listWrap.swipe({
                tap:function(event, target){ // trigger original click events if tap
                    var link = $(target),
                        list = $('#solutions-carousel ul');
                    if(link.hasClass('control') && !list.is(':animated')) {
                        if(link.hasClass('prev')) {
                            Crsl.slide('prev', true);
                        }
                        else {
                            Crsl.slide('next', true);
                        }
                    }
                    else
                        window.location.href = $(target).attr('href');
                },
                swipeLeft: function(event, direction, distance, duration, fingerCount) {
                    Crsl.slide('next', true);
                },
                swipeRight: function(event, direction, distance, duration, fingerCount) {
                    Crsl.slide('prev', true);
                },
                threshold: 100,
                excludedElements:[]});
        },
        findProg: function(prog) { // find the list item with given program
            var listCurrent = $('#solutions-carousel ul'),
                nextItem = listCurrent.find('[data-prog="' + prog + '"]:first').index(),
                activeItem = 2, // 3rd item in list is always the active item
                numLoop = nextItem - activeItem, // number of slide calls in forward direction
                i,
                end,
                dir = 'prev';

            if (numLoop < 0) { // if nextItem is located before activeItem in list
                end = -numLoop;
            }
            else if (numLoop > Math.floor(Crsl.totalItems / 2)) { // slide backwards if less slide calls
                end = Crsl.totalItems - numLoop;
            }
            else { // slide forward to nextItem
                end = numLoop;
                dir = 'next';
            }

            for(i = 0; i < end; i++) {
                Crsl.slide(dir, false, 300/end);
            }
        },
        slide: function(dir, crslClick, speed) { // dir = direction, fromCarousel = carousel-control click
            var listCurrent = $('#solutions-carousel ul'),
                crslClick = crslClick || false,
                speed = speed || 200,
                activeProg;

            if (dir === 'prev') {
                listCurrent.animate({
                    'left': '+=' + Crsl.widthItem + 'px'
                }, speed, function () {
                    // move the last item to front and update position
                    listCurrent.find('li:first').before(listCurrent.find('li:last'));
                    listCurrent.css({'left' : Crsl.offset});
                });

                activeProg = listCurrent.find('li').eq(1).data('prog');
            }
            else {
                listCurrent.animate({
                    'left': '-=' + Crsl.widthItem + 'px'
                }, speed, function () {
                    // move first item to end and update position
                    listCurrent.find('li:last').after(listCurrent.find('li:first'));
                    listCurrent.css({'left' : Crsl.offset});
                });

                activeProg = listCurrent.find('li').eq(3).data('prog');
            }

            // update dial if necessary
            if ((activeProg != Dial.currentPath) && crslClick) {
                Dial.update(activeProg);
            }
        }
    };
    
    Crsl.init();
    
    $('#solutions-carousel').css({'visibility': 'visible'});

}) ( jQuery );