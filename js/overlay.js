(function($) {

    OverlayCtrl = PS.OverlayCtrl = { // overlay
        init: function() {
        	OverlayCtrl.n = {
	        	overlay: $('#overlay'),
	        	menu: $('#menu'),
	        	close: $('#overlay .close')
        	}
        	
        	OverlayCtrl.events();
        },
        events: function() {
	        OverlayCtrl.n.menu.on('click', function(e) {
		        OverlayCtrl.n.overlay.show();
	        });
	        
	        OverlayCtrl.n.close.on('click', function(e) {
		        OverlayCtrl.n.overlay.hide();
	        });
        }
    };
    
    OverlayCtrl.init();

}) ( jQuery );