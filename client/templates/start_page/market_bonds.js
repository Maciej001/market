Template.marketBonds.helpers({
    bonds: function(){
        var curr = Session.get('currency');
        return Bonds.findOne({ currency: curr });
    }
})