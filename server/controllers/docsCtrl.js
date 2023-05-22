const Documentation=require("../models/documentationModel")
const catchAsyncErrors = require("../middlewares/catchAsyncErrors")
const ErrorHandler = require("../utils/ErrorHandler")
const slugify=require("slugify")


exports.createDoc=catchAsyncErrors(async(req,res,next)=>{
    if(req.body.title){
        req.body.slug=slugify(req.body.title.toLowerCase())
    }

    const doc=await Documentation.create(req.body)
    if(doc!=null){
        return res.status(200).json({
            success:true,
            msg:"Documentation created successfully",
            doc
        })
    }else{
        return next(new ErrorHandler("Could not be created",400))
    }
})

exports.getAllDocs=catchAsyncErrors(async(req,res,next)=>{
  
    const docs=await Documentation.find()
    const count=docs.length
    if(docs!=null){
        return res.status(200).json({
            success:true,
            count,
            docs
        })
    }else{
        return next(new ErrorHandler("Could not find docs",400))
    }
})

exports.getADoc=catchAsyncErrors(async(req,res,next)=>{
    const slug=req.params.slug
    const doc=await Documentation.findOne({slug:slug})
    
    if(doc!=null){
        return res.status(200).json({
            success:true,
            doc
        })
    }else{
        return next(new ErrorHandler("Could not find the specified doc",400))
    }
})

exports.deleteADoc=catchAsyncErrors(async(req,res,next)=>{
    const id=req.params.id
    const doc=await Documentation.findByIdAndDelete(id)
    
    if(doc!=null){
        return res.status(200).json({
            success:true,
            msg:"Document deleted successfully",
            doc
        })
    }else{
        return next(new ErrorHandler("Could not be deleted",400))
    }
})

exports.updateADoc=catchAsyncErrors(async(req,res,next)=>{
    const id=req.params.id
    if(req.body.title){
        req.body.slug=slugify(req.body.title.toLowerCase())
    }
    const doc=await Documentation.findByIdAndUpdate(id,req.body,{new:true})
    
    if(doc!=null){
        return res.status(200).json({
            success:true,
            msg:"Document updated successfully",
            doc
        })
    }else{
        return next(new ErrorHandler("Could not be updated",400))
    }
})