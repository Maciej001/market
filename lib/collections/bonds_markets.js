// BondsMarkets collection: {
//   name: 
//   currency: 
//   bonnds: [] array of bondsIds
// }
BondsMarkets = new Mongo.Collection('bonds-markets');

BondsMarkets.allow({
  insert: function(userId, order) { return true; },
	update: function(userId, order) { return true; },
	remove: function(userId, order) { return true; },
});

Meteor.methods({
  updateBondsMarketsItem: function(market){
    BondsMarkets.update(market.id, { curve: market.curve, currency: market.currency });
  },
  insertBondsMarketsItem: function(market){
    var not_exists = !BondsMarkets.findOne({ curve: market.curve });
    
    if (not_exists)
      return BondsMarkets.insert({ curve: market.curve, currency: market.currency });
    else
      return 'bond market exists';
  }
});