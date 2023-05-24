const TutorialCategory=require("../models/tutCategory")
const catchAsyncErrors = require("../middlewares/catchAsyncErrors")
const slugify=require("slugify")
const ErrorHandler = require("../utils/ErrorHandler")


exports.postTutorialCaterogy=catchAsyncErrors(async(req,res,next)=>{
    if(req.body.title){
        req.body.slug=slugify(req.body.title.toLowerCase())
    }
    const postTutCat=await TutorialCategory.create(req.body)
    return res.status(200).json({
        success:true,
        msg:"Tutorial category created successfully",
        postTutCat
    })
})

exports.getAllTutCaterogy=catchAsyncErrors(async(req,res,next)=>{
   const items=await TutorialCategory.find()
   let count=items.length
   if(items!=null){
    return res.status(200).json({
        success:true,
        count,
        items
    })
   }else{
    return next(new ErrorHandler("Could not find tutorial categories",400))
   }
})

exports.getOneTutCaterogy=catchAsyncErrors(async(req,res,next)=>{
   const {slug}=req.params
   const item=await TutorialCategory.findOne({slug:slug})
   if(item!=null){
    return res.status(200).json({
        success:true,
        item
    })
   }else{
    return next(new ErrorHandler("Could not find tutorial category",400))
   }
})

exports.deleteOneTutCaterogy=catchAsyncErrors(async(req,res,next)=>{
   const id=req.params.id
   const item=await TutorialCategory.findByIdAndDelete(id)
   if(item!=null){
    return res.status(200).json({
        success:true,
        msg:"Delete successfully",
        item
    })
   }else{
    return next(new ErrorHandler("Could not be deleted",400))
   }
})

exports.updateOneTutCaterogy=catchAsyncErrors(async(req,res,next)=>{
   const id=req.params.id
   if(req.body.title){
    req.body.slug=slugify(req.body.title.toLowerCase())
   }
   const item=await TutorialCategory.findByIdAndUpdate(id,req.body,{
    new:true
   })
   if(item!=null){
    return res.status(200).json({
        success:true,
        msg:"Updated successfully",
        item
    })
   }else{
    return next(new ErrorHandler("Could not be updated ",400))
   }
})