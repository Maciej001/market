Meteor.startup(function(){
    Session.set('currency', 'HUF');
    Session.set('market', 'SWAPS');
    AutoForm.setDefaultTemplate('materialize');
});