BondsMarkets.remove({});

BondsMarkets.insert({
  curve: 'HGB',
  currency: 'HUF',
  bonds: [] // array of bondsIds
});

BondsMarkets.insert({
  curve: 'POLGB',
  currency: 'PLN',
  bonds: []
});

BondsMarkets.insert({
  curve: 'CZGB',
  currency: 'CZK',
  bonds: []
});

Curves.insert({
  curve: 'HUF_BUBOR_3M',
  currency: 'HUF', 
  data: []
});

Curves.insert({
  curve: 'HUF_BUBOR_6M',
  currency: 'HUF'
});

Curves.insert({
  curve: 'PLN_WIBOR_3M',
  currency: 'PLN'
});

Curves.insert({
  curve: 'EUR_EURIBOR_3M',
  currency: 'EUR'
});
