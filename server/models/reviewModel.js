const mongoose = require('mongoose'); 


var reviewSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    comment:{
        type:String,
        required:true,
    },
    color:{
        type:String,
        required:true
    },
    isApproved:{
        type:Boolean,
        default:false
    }
},{
    timestamps:true
});


module.exports = mongoose.model('Review', reviewSchema);