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
			
			// Load parsed data to the Collection
			// for(var i=1; i<results.data[0].length; i++){
			// 	HufBUBOR3M.insert({
			// 		bucket: results.data[0][i],
			// 		price: 	results.data[1][i]
			// 	});
			// }
			
			var curveId = Curves.insert({
				name: results.data[0][0]
			});
			
			for(var i=1; i<results.data[0].length; i++) {
				Curves.update(curveId, { $push: {
					buckets: {
						name: 	results.data[0][i],
						price: 	results.data[1][i]
					}
				} });
			}
		}, // complete ends
	});
}


