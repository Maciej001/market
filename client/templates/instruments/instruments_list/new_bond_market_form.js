Template.newBondMarketForm.events({
    'submit form': function(e){
		e.preventDefault();
		var market = {
			curve: 	    String($(e.target).find('#bondCurveName').val()).toUpperCase(),
			currency: 	String($(e.target).find('#bondCurveCurr').val()).toUpperCase()
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
    'click button[type=cancel]': function(e){
    	e.preventDefault();
        Session.set('addBondToMarket',false);
    }
    
});