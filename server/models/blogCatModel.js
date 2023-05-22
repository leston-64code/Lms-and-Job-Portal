const mongoose=require("mongoose")

const blogCategorySchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true
    }
},
{
    timestamps:true
}
)

module.exports=mongoose.model("BlogCategory",blogCategorySchema)