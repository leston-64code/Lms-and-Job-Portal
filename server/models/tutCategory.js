const mongoose = require('mongoose'); 


var tutCategorySchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true,
    },
    slug:{
        type:String,
        required:true,
        unique:true,
        index:true
    },
    iamge:{
        type:String,
        default:"https://www.passportjs.org/packages/passport-google-oauth20/"
    }
},{
    timestamps:true
});


module.exports = mongoose.model('TutorialCategory', tutCategorySchema);