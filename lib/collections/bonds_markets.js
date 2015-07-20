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

BondsMarkets.before.insert(function (userId, doc) {
  if (doc.curve){
    doc.curve = doc.curve.toUpperCase();
  }
  if (doc.currency) {
    doc.currency = doc.currency.toUpperCase();
  }
});

Meteor.methods({
  updateBondsMarketsItem: function(market){
    BondsMarkets.update(market.id, { $set: { curve: market.curve, currency: market.currency } });
  },
  insertBondsMarketsItem: function(market){
    var not_exists = !BondsMarkets.findOne({ curve: market.curve });
    
    if (not_exists)
      return BondsMarkets.insert({ curve: market.curve, currency: market.currency });
    else
      return 'bond market exists';
  }
});

BondsMarkets.attachSchema( new SimpleSchema({
    curve: {
      type: String,
      label: "Bond Curve Name",
      min: 2,
      max: 10,
      unique: true,
    },
    currency: {
      type: String,
      label: "Currency",
      min: 3,
      max: 3
    }
}));

SimpleSchema.messages({
  minString: "[label] must be a least [min] characters",
  maxString: "[label] cannot exceed [max] characters",
  expectedString: "[label] must be a string"
});