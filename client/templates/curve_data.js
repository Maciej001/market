Template.curveData.helpers({
    curveBuckets: function(curve){
        if (Curves.find({ name: curve }).count()>0) {
            return Curves.findOne({ name: curve }).buckets;
        }
    }, 
    curveIsAvailable: function(curve){
		if (Curves.find({ name: { $search: curve } }).count()>0) {
			console.log('there are curves ', Curves.find({ $text: { $search: curve } }).count() );
			return true;
		} else {
			return false;
		}
	},
	today: function(){
		var now = new Date();
	    return moment(now).format("DD MMM YYYY");
	}
});