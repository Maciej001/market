
// INITIALIZE
Template.curvesList.onCreated(function(){
   Session.set("addCurve", false); 
});


// HELPERS
Template.curvesList.helpers({
   marketCurves: function(){
       return Curves.find({});
   },
   addCurve: function(){
       return Session.get("addCurve");
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
        Sessioni.set('addBondsMarket', false);

        // Close Bonds List
        Session.set('listBonds', false);
        
        // Close Add Bond Form
        Session.set('addBond', false);
    }
    
})