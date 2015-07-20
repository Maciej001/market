Template.BondsMarketsItem.onRendered(function(){
  Session.set("editMarket", false);
});

Template.BondsMarketsItem.helpers({

});

Template.BondsMarketsItem.events({
  'click .delete-market': function(){
    BondsMarkets.remove(this._id);
  },
  'keypress input': function(e){
    var event = e;
    var keyCode = e.keyCode || e.which; 
    
    if ((keyCode === 13) || (keyCode === 9)) {
      e.preventDefault()
      
      var market = {
        id: this._id,
        curve:      String($(e.target).closest('form').find('[type=curve]').val()).toUpperCase(),
        currency:    String($(e.target).closest('form').find('[type=currency]').val()).toUpperCase()
      }

      Meteor.call('updateBondsMarketsItem', market, function(err,r){
        $(event.target).blur();
      });
    }
  },
  'click .edit-market': function(){
    Session.set('editMarket', true);
    Session.set('marketToEdit', this._id);
  }
});
