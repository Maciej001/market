// INITIALIZE
Template.loadData.onCreated(function(){

});

Template.loadData.helpers({

})

// EVENTS
Template.loadData.events({
    'change input[type=file]': function(){
        var myFile = $('#input').get(0).files[0];
        $('#input-file').text(myFile.name);
        $('.file-icon').removeClass('non-visible');
        $('.import-file').removeClass('non-visible');
    }
})