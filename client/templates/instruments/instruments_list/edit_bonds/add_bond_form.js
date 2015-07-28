Template.addBondForm.onCreated(function(){
    
    var options = {
        coupon: 0,
        maturity: new Date(2025, 6, 25),
    };
    
    var bondYield;
    var price = 102.00;
    
    
    console.log('price ', Fin.bond_price(options.maturity, 3.25, 2.85, 3));

});

Template.addBondForm.helpers({
    getBondsMarketsId: function(){
        return { 
                    bondsMarketsId: Session.get('marketToEditId') 
                };
    },
    marketCurrency: function(){
        return Session.get('marketCurrency');
    },
    firstCouponOptions: function(){
        return [
            {label: "first short", value: "short"},
            {label: "normal", value: "normal"}
        ];
    },
    todaysDate: function(){
        return new Date;
    }
});

Template.addBondForm.events({
    'click .cancel': function(e){
    	e.preventDefault();
    	Session.set("addBond", false);
        AutoForm.resetForm('addBondForm'); // resets form validations
    }
});




