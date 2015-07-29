
// INITIALIZATION
Template.bondsList.onCreated(function(){
    var instance = this;
    instance.marketId = Session.get('marketId');
    instance.currency = BondsMarkets.findOne(instance.marketId).currency; 
    
    // addBonds - decides if template shows form to add bonds
    Session.set("addBond", false);
    Session.set("marketCurrency", instance.currency);
    
    // Subscribe 
    instance.autorun(function(){
        var subscription = instance.subscribe('bonds', { marketId: instance.marketId }); 
    });
    
    // Coursor
    instance.bonds = function() { 
        return Bonds.find({ marketId: Session.get('marketId') }, { sort: { maturity: 1 } });
    };
});


// HELPERS
Template.bondsList.helpers({
  bonds: function(){
    return Template.instance().bonds();  
  },
  
  marketToEditName: function(){
        return Session.get('marketCurve');
  },

  addBond: function(){
      return Session.get("addBond");
  }, 
  
  hasBonds: function(){
    var marketId = Template.instance().marketId;
    
    if (Bonds.find({ marketId: marketId }).count() === 0) {
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