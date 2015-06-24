HufBUBOR3M = new Mongo.Collection('huf_bubor_3m');

HufBUBOR3M.allow({
    insert: function(userId, order) { return true; },
	update: function(userId, order) { return true; },
	remove: function(userId, order) { return true; }
});