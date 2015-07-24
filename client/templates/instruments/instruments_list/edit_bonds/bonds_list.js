
// INITIALIZATION
Template.bondsList.onCreated(function(){
    var instance = this;
    
    // addBonds - decides if template shows form to add bonds
    Session.set("addBond", false);
    
    // Subscribe 
    instance.autorun(function(){
        var subscription = instance.subscribe('bonds', { marketId: Session.get('marketId') }); 
    });
    
    // Coursor - will be reactive because Session is reactive
    instance.bonds = function() { 
        return Bonds.find({ marketId: Session.get('marketId')}, { sort: { maturity: 1 } });
    };
});


// HELPERS
Template.bondsList.helpers({
  bonds: function(){
    return Template.instance().bonds();  
  },
  marketToEditName: function(){
        var market = BondsMarkets.findOne(Session.get('marketId'));
        return market.curve;
  },
  addBond: function(){
      return Session.get("addBond");
  }, 
  hasBonds: function(){
    var marketId = Session.get('marketId');
    
    if (Bonds.find({marketId: marketId}).count() === 0) {
        return false;
    } 
    else {
        return true;
    }
  },
});


// EVENTS
Template.bondsList.events({
    'click .add-bond': function(){
        Session.set("addBond", true);
    }
});