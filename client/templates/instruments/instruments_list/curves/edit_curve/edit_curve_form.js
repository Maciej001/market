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
    
        // Close and reset edit form
        Session.set('editCurve', false); 
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