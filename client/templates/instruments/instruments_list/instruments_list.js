// INITIALIZE
Template.instrumentsList.onCreated(function(){
    
    // Add Bonds Market form
    Session.setDefault('addBondsMarket', false);
    
    // Bonds listing
    Session.setDefault('listBonds', false);
    
    // Bond add form
    Session.setDefault('addBond', false);
    
    // Add Curve form
    Session.setDefault('addCurve', false);
    
    // Edit Curve form
    Session.setDefault('editCurve', false);
});

// HELPERS
Template.instrumentsList.helpers({
    listBonds: function(){
        return Session.get('listBonds');
  }
});