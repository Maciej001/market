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
    }
});

