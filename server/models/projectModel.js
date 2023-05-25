const mongoose = require('mongoose'); 


var projectSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    slug:{
        type:String,
        require:true,
        unique:true
    },
    category:{
        type:String,
        required:true
    },
    links:[
        {
            name:String,
            url:String,
        }
    ],
    images:[],
    author:{
        type:String,
        default:"Admin",
    },
    price:{
        type:Number,
        default:0
    },
    priceAfterDiscount:{
        type:Number,
        default:0
    },
    isPublished:{
        type:Boolean,
        default:false
    },
    techStack:[],
    keywords:[]
},{
    timestamps:true
});


module.exports = mongoose.model('Project', projectSchema);