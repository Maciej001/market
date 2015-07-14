Router.configure({
  layoutTemplate: 'layout',
  waitOn: function(){  
    return  [
      Meteor.subscribe('curves'), 
      Meteor.subscribe('bonds-markets'),
      Meteor.subscribe('bonds')
    ]
  }
});

Router.route('/', function(){
  this.render('startPage');
});

Router.route('/instruments', function(){
   this.render('instruments');
});

Router.route('/instruments/edit/:_id', 
  function(){
    var bondsMarket = BondsMarkets.findOne({_id: this.params._id});
    this.render('InstrumentsEdit', { data: bondsMarket });
  },
  { name: 'instruments.edit' } 
);

Router.route('/curves', function(){
  this.render('curve');
});