Curves = new Mongo.Collection('curves');

Curves.attachSchema( new SimpleSchema({
  name: {
    type: String
  },
  l1currency: {
    type: String,
    label: "Currency",
    min: 3,
    max: 3
  },
  l1Type: {
    type: String,
    label: "Type",
    allowedValues: ["fixed", "float"]
  },
  l1Index: {
    type: String,
    label: "Index",
    min: 3,
    max: 20,
    optional: true,
  },
  l1PaymentFrequency: {
    type: String,
    label: "Payment Freqency",
    allowedValues: ["annual", "semi-annual", "quarterly"],
  },
  l1DayCount: {
    type: String,
    label: "Day Count",
    allowedValues: ["act/365", "act/360", "act/act", "30/360"]
  },
  l2currency: {
    type: String,
    label: "Currency",
    min: 3,
    max: 3
  },
  l2Type: {
    type: String,
    label: "Type",
    allowedValues: ["fixed", "float"]
  },
  l2Index: {
    type: String,
    label: "Index",
    min: 3,
    max: 20,
    optional: true
  },
  l2PaymentFrequency: {
    type: String,
    label: "Payment Freqency",
    allowedValues: ["annual", "semi-annual", "quarterly"],
  },
  l2DayCount: {
    type: String,
    label: "Day Count",
    allowedValues: ["act/365", "act/360", "act/act", "30/360"]
  }
}));

Curves.allow({
  insert: function(userId, order) { return true; },
	update: function(userId, order) { return true; },
	remove: function(userId, order) { return true; },
});


Meteor.methods({
  removeAllCurves: function() {
    return Curves.remove({});
  }
});
