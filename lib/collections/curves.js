Curves = new Mongo.Collection('curves');

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
