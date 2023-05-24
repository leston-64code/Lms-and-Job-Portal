const mongoose = require('mongoose'); 


var lessonSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true,
        minlength:3,
        maxlength:350,
        unique:true
    },
    slug:{
        type:String,
        required:true,
        unique:true,
    },
    content:{
        type:String,
        required:true,
    },
    video:{
        type:String,
    },
    free_preview:{
        type:Boolean,
        default:false
    }
},{
    timestamps:true
});

//Export the model
module.exports = mongoose.model('Lesson', lessonSchema);