Template.startPage.events({
    'click .currency': function(e){
        e.preventDefault();
        $('.which-currency a').removeClass('active-currency');
        $(e.target).addClass('active-currency');
    },
    'click .market': function(e){
        e.preventDefault();
        $('.which-market a').removeClass('active-market');
        $(e.target).addClass('active-market');
        Session.set("market", $(e.target).text());
    }
});

Template.startPage.helpers({
    curves: function(){
        var curr = Session.get('currency');
        return Curves.find({ currency: curr });
    },
    marketForBonds: function(){
        forBonds = Session.get('market');
        if (forBonds === 'BONDS')
            return true
        else 
            return false
    }
});





