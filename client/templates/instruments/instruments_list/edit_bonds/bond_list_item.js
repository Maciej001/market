Template.bondListItem.helpers({
    bondMaturity: function(){
        var bond = this;
        // return bond.maturity;
        return moment(bond.maturity).format("DD MMM YY");
    },
    
    bondId: function(){
        return "bondId-" + this._id;
    },
    
    bond: function(){
        return this;
    }
});

Template.bondListItem.events({
    'click .delete-bond': function(){
        Bonds.remove(this._id);
    }
})