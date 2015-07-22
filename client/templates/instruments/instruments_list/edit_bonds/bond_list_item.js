Template.bondListItem.helpers({
    bondMaturity: function(){
        var bond = this;
        // return bond.maturity;
        return moment(bond.maturity).format("DD MMM YY");
    } 
});