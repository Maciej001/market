Template.newCurveForm.events({
    'click .cancel': function(e){
    	e.preventDefault();
    	
    	// Close form
        Session.set('addCurve', false); 
        
        // Reset form validations
        AutoForm.resetForm('newCurveForm'); 
    }
});

AutoForm.hooks({
	newCurveForm: {
		onSuccess: function() {
		    
			// Close form
			Session.set('addCurve', false);
		}
	}	
});