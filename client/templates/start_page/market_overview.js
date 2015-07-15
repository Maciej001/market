Template.MarketOverview.helpers({
  marketForBonds: function(){
    forBonds = Session.get('market');
    if (forBonds === 'BONDS')
      return true
    else 
      return false
  }
})