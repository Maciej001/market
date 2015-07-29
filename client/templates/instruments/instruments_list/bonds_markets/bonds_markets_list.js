Template.bondsMarketsList.onRendered(function(){
  Session.set('addBondToMarket', false);  
});

Template.bondsMarketsList.helpers({
  bondsMarkets: function(){
    return BondsMarkets.find();
  },
  addBondToMarket: function(){
    return Session.get('addBondsMarket');
  }
});

Template.bondsMarketsList.events({
  'click .add-bond-market': function(){
    Session.set('addBondsMarket',true);
  }
});

