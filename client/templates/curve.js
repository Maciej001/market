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
			var curveId, curve_row, prices_row;
		
			Meteor.call('removeAllCurves');
			
			for(var j=0; j < results.data.length-1; j += 2) {
				curve_row = j;
				prices_row = j + 1;
				
				curveId = Curves.insert({
					name: results.data[curve_row][0]
				});	
				
				for(var i=1; i<results.data[curve_row].length; i++) {
					Curves.update(curveId, { $push: {
						buckets: {
							name: 	results.data[curve_row][i].replace(/ /g,''),
							price: 	Number(results.data[prices_row][i]),
							start:	startDate(results.data[curve_row][i]),
							end: 	endDate(results.data[curve_row][i])
						}
					} });
				}
			}
		}, // complete ends
	});
}

startDate = function(date) {
	var check_date = date.replace(/ /g,'');
	var start_date;
	var todayDate = new Date();
	
	var spot = tPlusDate(todayDate, 2);
	// if date is 1M 3M 9m 
	if (/\d+(m|M)/.test(check_date) && !/\d+(m|M)[-]\d+(m|M)/.test(check_date)){
		var month = Number(check_date.substring(0, check_date.length - 1));
		start_date = spot;
	} else if (/\d+(m|M)[-]\d+(m|M)/.test(check_date)) { // if FRAs
		// if double digit starting periiod eg. 12m-15m
		
		if ( /\d\d(m|M)[-]/.test(check_date) ) {
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
		var start_year = Number(check_date.substring(0, check_date.length-1 ));
		start_date = spot;
	}
	
	return start_date;
}

endDate = function(date){
	var check_date = date.replace(/ /g,'');
	var end_date;
	var todayDate = new Date();
	
	var spot = tPlusDate(todayDate, 2);
	
	// if date is 1M 3M 9m 
	if (/\d+(m|M)/.test(check_date) && !/\d+(m|M)[-]\d+(m|M)/.test(check_date)){
		var month = Number(check_date.substring(0, check_date.length - 1));
		end_date = mFDate(new Date(spot.getFullYear(), spot.getMonth() + month, spot.getDate()));
	} else if (/\d+(m|M)[-]\d+(m|M)/.test(check_date)) { // if FRAs
		// if double digit starting periiod eg. 12m-15m
		
		if ( /[-]\d\d(m|M)/.test(check_date) ) {
			// double digit as starting date -> 12m
			var last_three = 	check_date.substr(check_date.length - 3);
			var end_month = 	Number(last_three.substr(0, last_three.length -1));
		} else {
			// single digit at start 
			var last_two = 		check_date.substr(check_date.length - 2);
			var end_month =		Number(last_two.substr(0, last_two.length -1));
		}
		
		var e_year = 	spot.getFullYear();
		var e_month =	spot.getMonth() + end_month;
		var e_day = 	spot.getDate();
		
		end_date = mFDate(new Date(e_year, e_month, e_day));
		
	} else if (/\d+(y|Y)/.test( check_date.replace(/ /g,'') ) ) { // if year eg. 1y, 5y 

		var e_year = 	spot.getFullYear() + Number(check_date.substr(0, check_date.length - 1));
		var e_month = 	spot.getMonth();
		var e_day = 	spot.getDate();
		end_date = mFDate(new Date(e_year, e_month, e_day));
	}
	
	return end_date;	
}




