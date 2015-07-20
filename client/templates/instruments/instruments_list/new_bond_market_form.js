Template.insertBondMarketForm.events({
    'click .cancel': function(e){
    	e.preventDefault();
        Session.set('addBondToMarket',false);
        AutoForm.resetForm('insertBondMarketForm'); // resets form validations
    }
    
});

AutoForm.hooks({
	insertBondMarketForm: {
		onSuccess: function() {
			// switches of the form template, so it's not displayed anymore.
			Session.set('addBondToMarket',false);
		}
	}	
});