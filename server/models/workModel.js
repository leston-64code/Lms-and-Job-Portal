const mongoose = require('mongoose'); 


var workSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    mobile:{
        type:String,
        required:true,
    },
    profession:{
        type:String,
        required:true,
    },
    currentJob:{
        type:String,
        required:true,
    },
    resume:{
        type:String,
        required:true,
    },
},{
    timestamps:true
});


module.exports = mongoose.model("Work", workSchema);