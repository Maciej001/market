Router.configure({
  layoutTemplate: 'layout',
  waitOn: function(){  
    return  [
      Meteor.subscribe('huf_bubor_3m'),
      Meteor.subscribe('curves')
    ]
  }
});

Router.route('/', function(){
  this.render('curve');
});