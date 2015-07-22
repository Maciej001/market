var addMarketIdHook = {
    before: {
        insert: function(doc){
            doc.marketId = Session.get("marketId");
            return doc;
            doc.currency = doc.currency.toUpperCase()
            
        }
    }
};

AutoForm.addHooks(['addBondForm'],addMarketIdHook);