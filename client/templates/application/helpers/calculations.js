// dF calculates discount factor based on the curve, date and payment frequency 
// payment freq can be 1 - annual, 2 - semi-annual, 4 - quarterly 
// curve argument is name of the curve, eg: "HUF_BUBOR_3M"

addDatesToCurve = function(curve) {
    var curve = Curves.find({name: curve});
    
}

addDFToCurve = function (newCurve) {
    var curve = Curves.find({name: newCurve});
    var spot = spot();
    
    
}

dF = function(curve, date, frequency) {
    
}