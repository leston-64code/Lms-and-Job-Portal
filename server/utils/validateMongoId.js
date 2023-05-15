const mongoose=require("mongoose")
const ErrorHandler = require("./ErrorHandler")

const validateMondoDbId=(id,next)=>{
    // console.log(id)
    const isValid=mongoose.Types.ObjectId.isValid(id)
    // console.log(isValid)
    if(!isValid){
        return new ErrorHandler("User id not valid",400)
    }
}

module.exports=validateMondoDbId