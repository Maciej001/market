Template.bondsList.onRendered(function(){
   Session.set("addBond", false); 
});

Template.bondsList.helpers({
    marketToEditName: function(){
        var market = BondsMarkets.findOne(Session.get('marketId'));
        return market.curve;
  },
  addBond: function(){
      return Session.get("addBond");
  }, 
  bondCollection: function(){
      // returns Bonds belonging to BondsMarkets
    return Bonds.find({marketId: Session.get('marketId')});
  }
});

Template.bondsList.events({
    'click .add-bond': function(){
        Session.set("addBond", true);
    }
});