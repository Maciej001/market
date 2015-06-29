Template.curveData.helpers({
    curveBuckets: function(curve){
        if (Curves.find({ name: curve }).count()>0) {
            return Curves.findOne({ name: curve }).buckets;
        }
    }, 
    curveIsAvailable: function(curve){
		if (Curves.find({ currency: curve }).count() > 0) {
			console.log('there are curves ', curve );
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