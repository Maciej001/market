// Bonds collection: {
//  curve   - eg. hgbs
//  isin
//  currency
//  maturity
//  series    - eg. 24b
// }
Bonds = new Mongo.Collection('bonds');

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

Bonds.after.insert(function(){
  Session.set('addBond', false);
});

Bonds.before.insert(function(userId, doc){
  console.log("inserting bond: ", doc);
});

Bonds.attachSchema( new SimpleSchema({
    marketId: {
      type: String,
      label: "Bonds Markets Id"
    },
    isin: {
      type: String,
      label: "ISIN",
      min: 6,
      max: 20,
      unique: true,
    },
    shortName: {
      type: String,
      label: "Short name",
      min: 2,
      max: 10
    },
    name: {
      type: String,
      label: "Name",
      min: 2,
      max: 30,
    },
    coupon: {
      type: Number,
      decimal: true,
      label: "Coupon",
      min: 0,
      max: 20,
    },
    couponAccuracy: {
      type: Number,
      label: "Coupon accuracy",
      min: 0,
      max: 10,
    },
    firstCoupon: {
      type: String, 
      label: "First Coupon",
      allowedValues: ['short', 'normal'],

    },
    currency: {
      type: String,
      label: "Currency",
      min: 3,
      max: 3,
    },
    maturity: {
      type: Date,
      label: "Maturity",
    },
    outstanding: {
      type: Number,
      label: "Outstanding"
    }
}));

SimpleSchema.messages({
  minString: "[label] must be a least [min] characters",
  maxString: "[label] cannot exceed [max] characters",
  expectedString: "[label] must be a string",
  badDate: "[label] is not a valid date",
});
