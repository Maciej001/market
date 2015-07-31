// HELPERS 
Template.editCurveForm.helpers({
    thisCurve: function(){
        return Curves.findOne({ _id: Session.get('curveId') });
    }
});


// EVENTS
Template.editCurveForm.events({
    'click .cancel': function(e){
    	e.preventDefault();
    	
    	// Close form
        Session.set('editCurve', false); 
        
        // Reset form validations
        AutoForm.resetForm('editCurveForm'); 
    },
    
});


// AUTOFORM HOOKS
AutoForm.hooks({
	editCurveForm: {
		onSuccess: function() {
		    
			// Close form
			Session.set('editCurve', false);
		}
	}	
});