const mongoose = require('mongoose'); 


var tutorialSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        index:true,
    },
    slug:{
        type:String,
        required:true,
        unique:true,
        index:true
    },
    category:{
        type:String,
        required:true,
    },
    tutCatSlug:{
        type:String,
        required:true,
        index:true
    },
    topicName:{
        type:String,
        required:true,
        unique:true
    },
    content:{
        required:true,
        type:String
    },
    keywords:{
        type:[],
        required:true
    }
});


module.exports = mongoose.model('Tutorial', tutorialSchema);