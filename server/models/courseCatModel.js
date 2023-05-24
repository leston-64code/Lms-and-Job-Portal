const mongoose=require("mongoose")

const courseCategorySchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true
    },
    slug:{
        type:String,
        required:true,
        unique:true
    }
},
{
    timestamps:true
}
)

module.exports=mongoose.model("CourseCategory",courseCategorySchema)