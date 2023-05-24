const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const VideoCategory=require("../models/videoCatModel");
const ErrorHandler = require("../utils/ErrorHandler");
const slugifiy=require("slugify")

exports.createCategory=catchAsyncErrors(async(req,res,next)=>{
    if(req.body.title){
        req.body.slug=slugifiy(req.body.title.toLowerCase())
    }
    const category=await VideoCategory.create(req.body)
    if(category!=null){
        return res.status(200).json({
            success:true,
            msg:"Created successfully",
            category
        })
    }
})

exports.updateCategory=catchAsyncErrors(async(req,res,next)=>{
   const {id}=req.params
   if(req.body.title){
        req.body.slug=slugifiy(req.body.title.toLowerCase())
    }
   const updatedCategory=await VideoCategory.findByIdAndUpdate(id,req.body,{new:true})
   if(updatedCategory!=null){
        return res.status(200).json({
            success:true,
            updatedCategory
        })
   }else{
        return next(new ErrorHandler("Could not be updated",400))
   }
})

exports.deleteCategory=catchAsyncErrors(async(req,res,next)=>{
   const {id}=req.params
   const deletedCategory=await VideoCategory.findByIdAndDelete(id)
   if(deletedCategory!=null){
        return res.status(200).json({
            success:true,
            deletedCategory
        })
   }else{
        return next(new ErrorHandler("Could not be deleted",400))
   }
})

exports.getOneCategory=catchAsyncErrors(async(req,res,next)=>{
   const {slug}=req.params
   const category=await VideoCategory.findOne({slug:slug})
   if(category!=null){
        return res.status(200).json({
            success:true,
            category
        })
   }else{
        return next(new ErrorHandler("Category not found",400))
   }
})

exports.getAllCategories=catchAsyncErrors(async(req,res,next)=>{
   const categories=await VideoCategory.find()
   const categoriesCount=await VideoCategory.countDocuments()
   if(categories!=null){
        return res.status(200).json({
            success:true,
            categoriesCount,
            categories
        })
   }else{
        return next(new ErrorHandler("There was some issue",400))
   }
})

