const mongoose = require('mongoose');


var newsletterSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
    },
    
},{
    timestamps:true
});


module.exports = mongoose.model('Newsletter', newsletterSchema);