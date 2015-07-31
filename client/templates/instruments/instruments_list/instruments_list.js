// INITIALIZE
Template.instrumentsList.onCreated(function(){
    
    // Add Bonds Market form
    Session.set('addBondsMarket', false);
    
    // Bonds listing
    Session.set('listBonds', false);
    
    // Bond add form
    Session.set('addBond', false);
    
    // Add Curve form
    Session.set('addCurve', false);
    
    // Edit Curve form
    Session.set('editCurve', false);
});

// HELPERS
Template.instrumentsList.helpers({
    listBonds: function(){
        return Session.get('listBonds');
  }
});