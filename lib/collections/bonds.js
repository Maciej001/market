// BondsMarkets collection: {
//   name: 
//   currency: 
//   bonnds: [] array of bondsIds
// }
BondsMarkets = new Mongo.Collection('bonds-markets');

// Bonds collection: {
//  curve   - eg. hgbs
//  isin
//  currency
//  maturity
//  series    - eg. 24b
// }
Bonds = new Mongo.Collection('bonds');


BondsMarkets.allow({
  insert: function(userId, order) { return true; },
	update: function(userId, order) { return true; },
	remove: function(userId, order) { return true; },
});

Bonds.allow({
  insert: function(userId, order) { return true; },
	update: function(userId, order) { return true; },
	remove: function(userId, order) { return true; },
});


Meteor.methods({
  removeAllBonds: function() {
    return Bonds.remove({});
  }
});
