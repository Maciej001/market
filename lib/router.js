Router.configure({
  layoutTemplate: 'layout',
  waitOn: function(){  
    return  [
      Meteor.subscribe('curves'), 
      Meteor.subscribe('bonds')
    ]
  }
});

Router.route('/', function(){
  this.render('startPage');
});

Router.route('/curves', function(){
  this.render('curve');
});