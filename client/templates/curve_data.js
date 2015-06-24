Template.curveData.helpers({
    curveBuckets: function(curve){
        if (Curves.find({ name: curve }).count()>0) {
            return Curves.findOne({ name: curve }).buckets;
        }
    }, 
    curveIsAvailable: function(curve){
		if (Curves.find({ name: curve }).count()>0) {
			return true;
		} else {
			return false;
		}
	},
	today: function(){
	    return moment(today()).format("DD MMM YYYY");
	}
});