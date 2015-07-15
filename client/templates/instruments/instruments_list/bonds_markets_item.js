Template.BondsMarketsItem.onRendered(function(){

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
    
    console.log('klawisz ', e.which, ' ', e.keyCode);
    if ((keyCode === 13) || (keyCode === 9)) {
      e.preventDefault()
      
      var market = {
        id: this._id,
        curve:      String($(e.target).closest('form').find('[type=curve]').val()),
        currency:    String($(e.target).closest('form').find('[type=currency]').val())
      }

      Meteor.call('updateBondsMarketsItem', market, function(err,r){
        $(event.target).blur();
      });
    }
    
    
  }
});
