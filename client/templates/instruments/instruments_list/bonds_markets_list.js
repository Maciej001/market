Template.BondsMarketsList.onRendered(function(){
  Session.set('addBondToMarket', false);  
});

Template.BondsMarketsList.helpers({
  bondsMarkets: function(){
    return BondsMarkets.find();
  },
  addBondToMarket: function(){
    return Session.get('addBondToMarket');
  }
});

Template.BondsMarketsList.events({
  'click .add-bond-market': function(){
    Session.set('addBondToMarket',true);
  }
});

