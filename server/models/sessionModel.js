const mongoose = require('mongoose'); 

var bookSessionSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true
    },
    mobile:{
        type:String,
        required:true,
    },
    subject:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        default:"Requested"
    },
    timeSlot:{}
},{
    timestamps:true
});


module.exports = mongoose.model('BookSession', bookSessionSchema);