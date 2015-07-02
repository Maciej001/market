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
