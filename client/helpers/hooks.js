var addMarketIdHook = {
    before: {
        insert: function(doc){
            doc.marketId = Session.get("marketId");
            return doc;
        }
    }
};

AutoForm.addHooks(['addBondForm'],addMarketIdHook);