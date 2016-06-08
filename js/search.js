(function($) {

    SearchCtrl = PS.SearchCtrl = { // search
        init: function() {
        	SearchCtrl.n = {
	        	searchIcon: $('#search'),
	        	searchBar: $('#search-bar')
        	}
        	
        	SearchCtrl.events();
        },
        events: function() {
	        SearchCtrl.n.searchIcon.on('click', function(e) {
		        SearchCtrl.n.searchBar.slideToggle();
	        });
	        
	        SearchCtrl.n.searchBar.on('click', '.clear', function(e) {
		        SearchCtrl.n.searchBar.find('input').val('');
	        });
        }
    };
    
    SearchCtrl.init();

}) ( jQuery );