const mongoose = require('mongoose');


var docSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    slug:{
        type:String,
        required:true,
    },
    author:{
        type:String,
        default:"Admin"
    },
    type:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true,
    },
    keywords:{
        type:[],
        required:true
    },
    docImage:{
        type:String,
        default:"https://w7.pngwing.com/pngs/830/659/png-transparent-documents-logo-computer-icons-document-management-system-documents-miscellaneous-angle-text.png"
    }
});


module.exports = mongoose.model('Documentation', docSchema);