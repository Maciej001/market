Meteor.publish('huf_bubor_3m', function(){
	return HufBUBOR3M.find();
});

Meteor.publish('curves', function(){
    return Curves.find();
});
