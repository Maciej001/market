Template.curve.events({
	'submit form': function(e){
		e.preventDefault();

		var dataFile = $('input')[0].files[0]
		loadData(dataFile);
	}
});

var loadData = function(url){
	Papa.parse(url, {
		complete: function(results, file) {

			var curveId = Curves.insert({
				name: results.data[0][0]
			});
			
			for(var i=1; i<results.data[0].length; i++) {
				Curves.update(curveId, { $push: {
					buckets: {
						name: 	results.data[0][i].replace(/ /g,''),
						price: 	Number(results.data[1][i]),
						start:	startDate(results.data[0][i].replace(/ /g,'')),
						end: 	endDate(results.data[0][i].replace(/ /g,''))
					}
				} });
			}
		}, // complete ends
	});
}

startDate = function(date) {
	var check_date = date.replace(/ /g,'')
	var start_date;
	var todayDate = new Date();
	
	var spot = tPlusDate(todayDate, 2);
	// if date is 1M 3M 9m 
	if (/\d+(m|M)/.test(check_date) && !/\d+(m|M)[-]\d+(m|M)/.test(check_date)){
		var month = Number(check_date.substring(0, check_date.length - 1));
		start_date = spot;
	} else if (/\d+(m|M)[-]\d+(m|M)/.test(check_date)) { // if FRAs
		// if double digit starting periiod eg. 12m-15m
		
		if (_.isNumber(check_date.charAt(1))) {
			// double digit as starting date -> 12m
			var start_month=Number(check_date.substring(0, 2));
		} else {
			// single digit at start 
			var start_month = Number(check_date.substring(0,1));
		}
		
		var st_year = spot.getFullYear();
		var st_month = spot.getMonth() + start_month;
		var st_day = spot.getDate();
		
		start_date = mFDate(new Date(st_year, st_month, st_day));
		
	} else if (/\d+(y|Y)/.test( check_date.replace(/ /g,'') ) ) { // if year eg. 1y, 5y 
		console.log('its a year');
		var start_year = Number(check_date.substring(0, check_date.length-1 ));
		start_date = spot;
	}
	
	return start_date;
}

endDate = function(date){
	
}




