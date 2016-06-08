(function($) {

    VidAPI = PS.VidAPI = { // video api
        init: function() {
           
            // click on video link
            $('.vid-link').click(function(e){
                var $thumb = $(this);
                if(!$thumb.hasClass('linked')) {
                    e.preventDefault();
                    $thumb.addClass('tag');
                    addScriptTag($thumb.data('vid'), "response");
                }
            });
        },

    };
    
    VidAPI.init();

}) ( jQuery );

function addScriptTag(id, callback) {
    var scriptTag = document.createElement("script"),
        noCacheIE = '&noCacheIE=' + (new Date()).getTime(),
        url = "http://api.brightcove.com/services/library?command=find_video_by_id&video_id=" + id + "&video_fields=FLVURL&media_delivery=http&token=SHWGyv8pYq9pFhTV1pjllgLpRKJbGplmnOsXd-a8NZpF48bsY3EF8g..";
   
   // Add script object attributes
   scriptTag.setAttribute("type", "text/javascript");
   scriptTag.setAttribute("charset", "utf-8");
   scriptTag.setAttribute("src", url + "&callback=" + callback + noCacheIE);
   
    var head = document.getElementsByTagName("head").item(0);
    head.appendChild(scriptTag);
}

function response(jsonData) {
    var srcUrl = jsonData["FLVURL"],
        $taggedVid = $('.tag');
    
    $taggedVid.attr("href", srcUrl).removeClass('tag').addClass('linked');
    
    window.open(srcUrl, '_blank');
}