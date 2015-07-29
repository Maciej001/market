
// INITIALIZE
Template.curvesList.onCreated(function(){
   Session.set("addCurve", false); 
});


// HELPERS
Template.curvesList.helpers({
   marketCurves: function(){
       return Curves.find({});
   },
   addCurve: function(){
       return Session.get("addCurve");
   }
});

//EVENTS
Template.curvesList.events({
    'click .add-curve': function(){
        Session.set("addCurve", true);
    }
})