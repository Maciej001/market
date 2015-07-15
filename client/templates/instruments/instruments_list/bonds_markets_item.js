Template.BondsMarketsItem.onRendered(function(){

});

Template.BondsMarketsItem.helpers({

});

Template.BondsMarketsItem.events({
  'click .delete-market': function(){
    BondsMarkets.remove(this._id);
  },
  'keypress input': function(e){
    // if enter was pressed
    if (e.which === 13) {
      var field = 'curve';
      e.preventDefault()
      if ($(e.target).attr('type') === 'currency') {
        field = 'currency'
      }
      
      var market = {
        key:      field,
        value:    String($(e.target).val())
      }
      debugger;
      Meteor.call('updateBondsMarketsItem', market);
    }
  }
});
