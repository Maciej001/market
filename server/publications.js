Meteor.publish('curves', function(){
    return Curves.find();
});

Meteor.publish('bonds', function(){
   return Bonds.find(); 
});


