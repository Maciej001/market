Template.bondsList.onRendered(function(){
   Session.set("addBond", false); 
});

Template.bondsList.helpers({
    marketToEditName: function(){
        var market = BondsMarkets.findOne(Session.get('marketToEdit'));
        return market.curve;
  },
  addBond: function(){
      return Session.get("addBond");
  }
});

Template.bondsList.events({
    'click .add-bond': function(){
        Session.set("addBond", true);
    }
});