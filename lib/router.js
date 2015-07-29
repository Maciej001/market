Router.configure({

  waitOn: function(){  
    return  [
      Meteor.subscribe('curves'), 
      Meteor.subscribe('bonds-markets'),
      // Meteor.subscribe('bonds')
    ]
  }
});

Router.route('/', 
  function(){
    this.layout('StartPageLayout');
    this.render('Header', { to: 'header' });
    // this.render('Footer', { to: 'footer' });
    this.render('MarketOverview', { to: 'content' });
  },
  {
    name: 'start.page'
  }
);

Router.route('/instruments', 
  function(){
    this.layout('StartPageLayout');
    this.render('Header', { to: 'header' });
    // this.render('Footer', { to: 'footer' });
    this.render('instrumentsList', { to: 'content' });
  },
  {
    name: 'instruments.list'
  }
);

Router.route('/instruments/edit/:_id', 
  function(){
    this.layout('StartPageLayout');
    var bondsMarket = BondsMarkets.findOne({_id: this.params._id});
    this.render('InstrumentsEdit', { to: 'content', data: bondsMarket });
  },
  { name: 'instruments.edit' } 
);

Router.route('/curves', function(){
  this.render('curve');
});