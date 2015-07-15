Template.NewBondMarketForm.events({
    'submit form': function(e){
		e.preventDefault();

		var market = {
			curve: 	    String($(e.target).find('input[type=curve]').val()).toUpperCase(),
			currency: 	String($(e.target).find('input[type=currency]').val()).toUpperCase()
		};

		Meteor.call('insertBondsMarketsItem', market, function(error, result) {
		    if (error) {
		        console.log(error);
		    } else {
    			Session.set('addBondToMarket', false);
    			console.log('result', result);
		    }
		});
	}, 
    'click button[type=cancel]': function(){
        Session.set('addBondToMarket',false);
    }
    
});