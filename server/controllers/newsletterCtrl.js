const Newsletter=require("../models/newsletterModel")
const catchAsyncErrors = require("../middlewares/catchAsyncErrors")
const ErrorHandler = require("../utils/ErrorHandler")

exports.subscribe=catchAsyncErrors(async(req,res,next)=>{
    const newEmail=await Newsletter.create(req.body)
    if(newEmail!=null){
        return res.status(200).json({
            success:true,
            message:"Subscribed to newsletter"
        })
    }else{
        return next(new ErrorHandler("Could not be subscribed",400))
    }
})

exports.unSubscribe=catchAsyncErrors(async(req,res,next)=>{
    const id=req.params.id
    const deletedEmail=await Newsletter.findByIdAndDelete(id)
    if(deletedEmail!=null){
        return res.status(200).json({
            success:true,
            message:"Unsubscribed newsletter"
        })
    }else{
        return next(new ErrorHandler("Could not unsubscribe",400))
    }
})