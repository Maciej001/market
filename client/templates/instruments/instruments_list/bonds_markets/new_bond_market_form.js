Template.insertBondMarketForm.events({
    'click .cancel': function(e){
    	e.preventDefault();
    	
    	// Close form
        Session.set('addBondToMarket', false);
        
        // Reset form validations
        AutoForm.resetForm('insertBondMarketForm'); 
    }
});

AutoForm.hooks({
	insertBondMarketForm: {
		onSuccess: function() {
			// Close form
			Session.set('addBondToMarket', false);
		}
	}	
});