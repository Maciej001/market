Template.BondsMarketsItem.onRendered(function(){
  
});

Template.BondsMarketsItem.helpers({

});

Template.BondsMarketsItem.events({
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
    // Open Bonds List Template for given market
    Session.set('listBonds', true);
    
    // Params for Bonds List template
    Session.set('marketId', this._id);
    Session.set('marketCurrency', this.currency);
    Session.set('marketCurve', this.curve);
    
    // Close Add/Edit Curve forms
    Session.set('addCurve', false);
    Session.set('editCurve', false);
  }
});
