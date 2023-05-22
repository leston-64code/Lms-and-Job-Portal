const mongoose=require("mongoose")

const docCategorySchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true,
    }
},
{
    timestamps:true
}
)

module.exports=mongoose.model("DocCategory",docCategorySchema)