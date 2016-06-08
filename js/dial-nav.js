(function($) {

    // pie chart setup
    var width = 274,
        height = 274,
        radius = Math.min(width, height) / 2;

    var arc = d3.svg.arc()
        .innerRadius(radius - 39)
        .outerRadius(radius - 5);

    var arcOver = d3.svg.arc()
        .innerRadius(radius - 44)
        .outerRadius(radius - 0);

    Dial = PS.Dial = {
        currentPath: 0, // active path's program number
        init: function() {
            
            // calculate slices
            var data = [],
                totalPrograms = $('.content > div').length,
                sliceValue = 100 / totalPrograms,
                sliceDeg = 360 / totalPrograms
            ;
            
            if ($('.no-svg').length) { // no svg fallback for dial
                Dial.fallback(sliceDeg, totalPrograms);
            }
            else {

                // generate slices                
                for (var j = 0; j < totalPrograms; j++) {
                    var slice = {};
                    slice.label = j;
                    slice.value = sliceValue;
                    data.push(slice);
                }
                
                //var color = d3.scale.category20();
                var color = d3.scale.ordinal()
                    .domain(d3.range(0,6))
                    .range(['#3b9dae', '#3fb7c1', '#17b09a', '#46c0aa', '#152c3d', '#113654', '#234f77', '#286eaa', '#3685be', '#117993']);

                var svg = d3.select(".dial-wrap")
                    .append("svg")
                    .data([data])
                    .attr("width", width)
                    .attr("height", height)
                    //.attr("id", "pie") // give id to svg 
                    .append("g")
                    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")
                    ;

                var pie = d3.layout.pie() //this will create arc data for us given a list of values
                    .value(function(d) { return d.value; }) // access the value of each element in data array
                ;

                var path = svg.selectAll("path")
                    .data(pie)
                    .enter()
                    .append("path")
                    .attr("fill", function(d, i) { return color(i); })
                    .attr("d", arc)
                    .attr("id", function(d, i) { return 'path' + i; })
                    ;

                // path click handler
                d3.selectAll('path')
                  .each(function(){
                    d3.select(this).on("click",function(d) {
                        d3.event.stopPropagation();

                        if($('#solutions-carousel ul').is(':animated')) {
                            return false;
                        }
                        else {
                            d3.selectAll('path')
                                .attr("class", "")
                                .transition()
                                .duration(300)
                                .attr("d", arc)
                                .attr("class", "")
                                ;
                            
                            d3.select(this)
                                .attr("class", "active")
                                .transition()
                                .duration(300)
                                .attr("d", arcOver)
                                .attr("class", "active")
                                ;
                            
                            Dial.clicked(d);
                        }
                    });
                });

                /* drag behavior */
                var degOrigin = 0,
                    rad2deg = 180 / Math.PI
                ;

                var drag = d3.behavior.drag()
                    /*.on('dragstart', function(d, i) {
                        
                    })  */
                    .on('drag', function(d, i) {

                        d3.event.sourceEvent.stopPropagation();

                        if($('#solutions-carousel ul').is(':animated')) {
                            return false;
                        }
                        else {
                            degOrigin = Dial.getDegree(Math.atan2(-d3.event.x, -d3.event.y) * rad2deg); // angle from origin given coordinates of mouse
                            
                            for(var n = 0; n < totalPrograms; n++) {
                                var low = sliceDeg * n,
                                    high = sliceDeg * (n + 1)
                                ;

                                if(degOrigin < high && degOrigin >= low) {
                                    Dial.update(n, 100);
                                    break;
                                }
                            }
                        }

                    })
                    .on('dragend', function(d, i) {
                        if($('#solutions-carousel ul').is(':animated')) {
                            return false;
                        }
                        else {
                            Crsl.findProg(Dial.currentPath); // index of last path
                        }
                    });
                
                d3.selectAll('path').call(drag);
            }
        },
        clicked: function(section) { // when path is clicked, update center
            var program = '#prog' + section.data.label; // id of selected topic

            Dial.currentPath = section.data.label;
            $(program).show().siblings().hide();

            Crsl.findProg(Dial.currentPath);
        },
        cycle: function() {
            var time = 300,
                index = 0,
                max = $('.content > div').length;
            
            var cycle = setInterval(function(){

                d3.selectAll('path')
                    .attr("class", "")
                    .transition()
                    .duration(time)
                    .attr("d", arc)
                    ;

                d3.select("#path" + index)
                    .attr("class", "active")
                    .transition()
                    .duration(time)
                    .attr("d", arcOver);

                $('#prog' + index).delay(time-100).show(0).siblings().delay(time-100).hide(0);

                index++;
                
                if(index > max) {
                    clearInterval(cycle);
                
                    d3.select("#path0") // set first arc to active
                        .transition()
                        .duration(time)
                        .attr("d", arcOver);

                    $('#prog0').delay(time-100).show(0).siblings().delay(time-100).hide(0);
                    $('.clear-overlay').hide();
                }

            },300);
        },
        getDegree: function(angle) {
            if(angle < 0){
                angle += 360;
            }
            else if(angle > 359){
                angle %= 360;
            }
            return 360 - angle; // clockwise angle from top center
        },
        update: function(index, time) { // update entire dial
            time = time || 300; // set animation time if specified

            d3.selectAll('path')
                .attr("class", "")
                .transition()
                .duration(time)
                .attr("d", arc)
                ;

            d3.select("#path" + index)
                .attr("class", "active")
                .transition()
                .duration(time)
                .attr("d", arcOver);

            $('#prog' + index).show().siblings().hide();
            Dial.currentPath = index;
        },
        fallback: function(sliceDeg, totalSlices) {
            var skewY = 90 - sliceDeg,
                unrotate = sliceDeg / 2,
                rotate = 0,
                dial = $('.dial-basic');

            $('.dial-basic li').each(function(index) { // iterate through each li
                var liCss = 'rotate(' + rotate + 'deg) skewY(-' + skewY + 'deg)',
                    divCss = 'skewY(' + skewY + 'deg) rotate(' + unrotate + 'deg)';
                $(this).css('transform', liCss);
                $(this).find('div').css('transform', divCss);
               
                rotate += sliceDeg;
            });

            dial.show();
            dial.find('li a').on('click', function(e) {
                e.preventDefault();
                var program = $(this).data('prog');

                Crsl.findProg(program);
                $('#prog' + program).show().siblings().hide();
            });
        }
    };

    Dial.init();
    
    $('.dial-wrap svg').css({'visibility': 'visible'});

    Dial.cycle(); // animate one cycle through dial

}) ( jQuery );