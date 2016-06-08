(function($) {

    FormCtrl = PS.FormCtrl = { // form
        init: function() {
        	FormCtrl.n = {
	        	form: $('.form-main form'),
	        	textInputs: $('.form-main form input[type="text"], .form-main form textarea'),
	        	selectItems: $('.form-main form select'),
	        	messageItems: $('.form-main form span.message'),
	        	messageContainer: $('.form-main form p.message')
        	}
        	
        	FormCtrl.replaceLabels();
        	FormCtrl.addSelectArrows();
        	FormCtrl.replaceMessages();
        },
        replaceLabels : function() {
	        FormCtrl.n.textInputs.each(function(i, el){
		        $el = $(el);
		        
		        $el.attr('placeholder', $el.parents('.field').find('label').text());
	        });
        },
        addSelectArrows : function() {
	        FormCtrl.n.selectItems.each(function(i,el){
		       $el = $(el);
		       
		       $el.parents('.field').addClass('select-item'); 
	        });
        },
        replaceMessages : function() {
	        FormCtrl.n.messageItems.each(function(i, el){
		        FormCtrl.n.messageContainer.append(el);
	        });
        }
    };
    
    FormCtrl.init();

}) ( jQuery );