const Video=require("../models/videoModel")
const catchAsyncErrors = require("../middlewares/catchAsyncErrors")
const slugify=require("slugify")
const ErrorHandler = require("../utils/ErrorHandler")


exports.postVideo=catchAsyncErrors(async(req,res,next)=>{
    if(req.body.title){
        req.body.slug=slugify(req.body.title.toLowerCase())
    }

    const video=await Video.create(req.body)
    
    if(video!=null){
        return res.status(200).json({
            success:true,
            msg:"Video posted successfully",
            video
        })
    }else{
        return next(new ErrorHandler("Could not be created",400))
    }
})

exports.getAVideo=catchAsyncErrors(async(req,res,next)=>{
    const slug=req.params.slug
    const video=await Video.findOne({slug:slug})

    if(video!=null){
        return res.status(200).json({
            success:true,
            video
        })
    }else{
        return next(new ErrorHandler("Could not find video",400))
    }
})

exports.getAllVideos=catchAsyncErrors(async(req,res,next)=>{
    const videos=await Video.find()
    const count=videos.length
    if(videos!=null){
        return res.status(200).json({
            success:true,
            count,
            videos
        })
    }else{
        return next(new ErrorHandler("Could not find videos",400))
    }
})

exports.deleteAVideo=catchAsyncErrors(async(req,res,next)=>{
    const id=req.params.id
    const video=await Video.findByIdAndDelete(id)

    if(video!=null){
        return res.status(200).json({
            success:true,
            msg:"Video deleted successfully",
            video
        })
    }else{
        return next(new ErrorHandler("Could not be deleted",400))
    }
})

exports.updateAVideo=catchAsyncErrors(async(req,res,next)=>{
    const id=req.params.id
    if(req.body.title){
        req.body.slug=slugify(req.body.title.toLowerCase())
    }

    const video=await Video.findByIdAndUpdate(id,req.body,{new:true})

    if(video!=null){
        return res.status(200).json({
            success:true,
            msg:"Video updated successfully",
            video
        })
    }else{
        return next(new ErrorHandler("Could not be updated",400))
    }
})