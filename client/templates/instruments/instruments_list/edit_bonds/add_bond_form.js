Template.addBondForm.onCreated(function(){
    
    var bondYield;
    var price = 102.00;
    
    var bond = {
        maturity: new Date(2025, 6, 25),
        coupon:   3.25,
        bYield:   3.1,
        coupon_accuracy: 3 // decimal places for coupon accuracy assuming 100 nominal
    }
    
    
    console.log('price ', Fin.bond_price(DT.tPlusDate(DT.today(), 5), bond));

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




