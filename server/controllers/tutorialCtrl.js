const Tutorial=require("../models/tutorialModel")
const catchAsyncErrors = require("../middlewares/catchAsyncErrors")
const slugify=require("slugify")
const ErrorHandler = require("../utils/ErrorHandler")

exports.createTutorial=catchAsyncErrors(async(req,res,next)=>{
    if(req.body.title && req.body.category){
        req.body.slug=slugify(req.body.title.toLowerCase())
        req.body.tutCatSlug=slugify(req.body.category.toLowerCase())
    }
    const tutorial=await Tutorial.create(req.body)
    if(tutorial!=null){
        return res.status(200).json({
            success:true,
            msg:"Tutorial created successfully",
            tutorial
        })
    }else{
        return next(new ErrorHandler("Could not be created",400))
    }
})

exports.getAllTutorials=catchAsyncErrors(async(req,res,next)=>{
    const tutorials=await Tutorial.find()
    const count=tutorials.length
    if(tutorials!=null){
        return res.status(200).json({
            success:true,
            count,
            tutorials
        })
    }else{
        return next(new ErrorHandler("Could not fetch tutorials",400))
    }
})

exports.getOneTutorial=catchAsyncErrors(async(req,res,next)=>{
    const {slug,type}=req.params
    const tutorial=await Tutorial.findOne({
        slug:slug,
        tutCatSlug:type
    })

    if(tutorial!=null){
        return res.status(200).json({
            success:true,
            tutorial
        })
    }else{
        return next(new ErrorHandler("Could not fetch tutorial",400))
    }
})

// ******* Stopped at 3:57

exports.upadateATutorial=catchAsyncErrors(async(req,res,next)=>{
    const id=req.params.id
    if(req.body.title){
        req.body.slug=slugify(req.body.title.toLowerCase())
    }
    if(req.body.category){
        req.body.tutCatSlug=slugify(req.body.category.toLowerCase())
    }
    const tutorial=await Tutorial.findByIdAndUpdate(id,req.body,{new:true})

    if(tutorial!=null){
        return res.status(200).json({
            success:true,
            msg:"Tutorial Updated ",
            tutorial
        })
    }else{
        return next(new ErrorHandler("Could not update tutorial",400))
    }
})

exports.deleteATutorial=catchAsyncErrors(async(req,res,next)=>{
    const id=req.params.id
    const tutorial=await Tutorial.findByIdAndDelete(id)

    if(tutorial!=null){
        return res.status(200).json({
            success:true,
            msg:"Tutorial deleted",
            tutorial
        })
    }else{
        return next(new ErrorHandler("Could not delete tutorial",400))
    }
})