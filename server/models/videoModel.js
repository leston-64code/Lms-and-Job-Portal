const mongoose = require('mongoose'); 


var videoSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    slug:{
        type:String,
        required:true,
    },
    thumbnail:{
        type:String,
        required:true,
        default:"https://static.vecteezy.com/system/resources/previews/005/919/290/original/video-play-film-player-movie-solid-icon-illustration-logo-template-suitable-for-many-purposes-free-vector.jpg"
    },
    description:{
        type:String,
        required:true,
    },
    videoUrl:{
        type:String,
        required:true
    },
    keywords:{
        type:[],
        required:true
    }
},{
    timestamps:true
});


module.exports = mongoose.model('Video', videoSchema);