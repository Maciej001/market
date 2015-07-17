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
			Session.set('addBondToMarket',false);
		}
	}	
});