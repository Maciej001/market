
// INITIALIZE
Template.curvesList.onCreated(function(){
   
});


// HELPERS
Template.curvesList.helpers({
   marketCurves: function(){
       return Curves.find({});
   },
   addCurve: function(){
       return Session.get("addCurve");
   },
   editCurve: function(){
       return Session.get('editCurve');
   }
});

//EVENTS
Template.curvesList.events({
    'click .add-curve': function(){
        
        // Open Add Curve Form
        Session.set("addCurve", true);
        
        // Close Edit Curve form
        Session.set('editCurve', false);
        
        // Close Add BondsMarkets form
        Session.set('addBondsMarket', false);

        // Close Bonds List
        Session.set('listBonds', false);
        
        // Close Add Bond Form
        Session.set('addBond', false);
    },
    'click .edit-curve': function() {
        
        // Open Edit Curve Form
        Session.set("editCurve", true);
        
        Session.set("curveId", this._id);
        
        // Close Edit Curve form
        Session.set('addCurve', false);
        
        // Close Add BondsMarkets form
        Session.set('addBondsMarket', false);

        // Close Bonds List
        Session.set('listBonds', false);
        
        // Close Add Bond Form
        Session.set('addBond', false);
    }
})