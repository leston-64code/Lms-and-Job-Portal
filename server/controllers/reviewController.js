const Review=require("../models/reviewModel")
const User=require("../models/userModel")
const catchAsyncErrors = require("../middlewares/catchAsyncErrors")
const ErrorHandler = require("../utils/ErrorHandler")


exports.createReview=catchAsyncErrors(async(req,res,next)=>{
    const {_id}=req.user
    let data={
        user:_id,
        comment:req.body.comment,
        color:req.body.color
    }
    const review=await Review.create(data)
    if(review!=null){
        return res.status(200).json({
            success:true,
            review
        })
    }else{
        return next(new ErrorHandler("Could not be reviewed",400))
    }
})

exports.getAllReviews=catchAsyncErrors(async(req,res,next)=>{
  
    const reviews=await Review.find().populate("user","firstname picture")
    const count=reviews.length
    if(reviews!=null){
        return res.status(200).json({
            success:true,
            count,
            reviews
        })
    }else{
        return next(new ErrorHandler("Could not find reviewes",400))
    }
})

exports.getAReview=catchAsyncErrors(async(req,res,next)=>{
    const id=req.params.id
    const review=await Review.findById(id).populate("user","firstname picture")
    
    if(review!=null){
        return res.status(200).json({
            success:true,
            review
        })
    }else{
        return next(new ErrorHandler("Could not find reviewe",400))
    }
})

exports.deleteAReview=catchAsyncErrors(async(req,res,next)=>{
    const id=req.params.id
    const review=await Review.findByIdAndDelete(id)
    
    if(review!=null){
        return res.status(200).json({
            success:true,
            review
        })
    }else{
        return next(new ErrorHandler("Could not be deleted",400))
    }
})

exports.updateReviewStatus=catchAsyncErrors(async(req,res,next)=>{
    const id=req.params.id
    const review=await Review.findById(id)
    if(review.isApproved==true){
        review.isApproved=false
    }else{
        review.isApproved=true
    }
    await review.save()
    // const review=await Review.findByIdAndUpdate(id,{isAppproved:true},{new:true})
    
    if(review!=null){
        return res.status(200).json({
            success:true,
            msg:"Review status updated successfully",
            // review
        })
    }else{
        return next(new ErrorHandler("Could not be deleted",400))
    }
})