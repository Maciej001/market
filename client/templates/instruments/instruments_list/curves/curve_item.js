Template.curveItem.events({
    'click .edit-curve': function(){
        
        // Open Edit Curve Form
        Session.set('editCurve', true);
        
        // Close Bonds List
        Session.set('listBonds', false);
        
        // Close Add Bond Form
        Session.set('addBond', false);
        
        // Close Edit Curve Form
        Session.set('editCurve', false);
        
    }
})