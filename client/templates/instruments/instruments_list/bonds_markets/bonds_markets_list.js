Template.bondsMarketsList.onRendered(function(){
  Session.set('addBondsMarket', false);  
});

Template.bondsMarketsList.helpers({
  bondsMarkets: function(){
    return BondsMarkets.find();
  },
  addBondsMarket: function(){
    return Session.get('addBondsMarket');
  }
});

Template.bondsMarketsList.events({
  'click .add-bond-market': function(){
    
    // Open Add BondsMarket Form
    Session.set('addBondsMarket',true);
    
    // Close Edit/Add Curve Forms
    Session.set('addCurve', false);
    Session.set('editCurve', false);

  }
});

