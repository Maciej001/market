Template.bondsMarketsList.helpers({
  bondsMarkets: function(){
    return BondsMarkets.find();
  }
});

Template.bondsMarketsList.events({
  'click .delete-market': function(){
    BondsMarkets.remove(this._id);
  },
  
  'click .edit-market':function(){
    
  }
})