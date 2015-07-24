Template.addBondForm.helpers({
    getBondsMarketsId: function(){
        return { 
                    bondsMarketsId: Session.get('marketToEditId') 
                };
    },
    marketCurrency: function(){
        return Session.get('marketCurrency');
    }
});

Template.addBondForm.events({
    'click .cancel': function(e){
    	e.preventDefault();
    	Session.set("addBond", false);
        AutoForm.resetForm('addBondForm'); // resets form validations
    }
});