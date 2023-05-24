const catchAsyncErrors=require("../middlewares/catchAsyncErrors")
const ErrorHandler = require("../utils/ErrorHandler")

exports.createDocument=(Model,msg)=>{
    return catchAsyncErrors(async(req,res,next)=>{
        const document=await Model.create(req.body)
        if(document!=null){
            return res.status(200).json({
                success:true,
                msg:msg
            })
        }else{
            return next(new ErrorHandler("Could not be created"))
        }
        })
}

exports.updateDocument=(Model,msg)=>{
    return catchAsyncErrors(async(req,res,next)=>{
        const {id}=req.params
        const document=await Model.findByIdAndUpdate(id,req.body,{new:true})
        if(document!=null){
            return res.status(200).json({
                success:true,
                msg:msg
            })
        }else{
            return next(new ErrorHandler("Could not be updated"))
        }
        })
}

exports.deleteDocument=(Model,msg)=>{
    return catchAsyncErrors(async(req,res,next)=>{
        const {id}=req.params
        const document=await Model.findByIdAndDelete(id)
        if(document!=null){
            return res.status(200).json({
                success:true,
                msg:msg
            })
        }else{
            return next(new ErrorHandler("Could not be deleted"))
        }
        })
}

exports.getDocument=(Model,msg,populateOptions)=>{
    return catchAsyncErrors(async(req,res,next)=>{
        const {id,slug}=req.params
        let document;
        if(id){
             document=await Model.findById(id)
        }else{
             document=await Model.findOne({slug:slug})
        }

        if(populateOptions){
            document=document.populate(populateOptions)
        }

        if(document!=null){
            return res.status(200).json({
                success:true,
                msg:msg,
                document
            })
        }else{
            return next(new ErrorHandler("Could not be fetched"))
        }
        })
}

exports.getAllDocuments=(Model,populateOptions)=>{
    return catchAsyncErrors(async(req,res,next)=>{
        console.log(req.query)
        let documents=await Model.find()
        let count=documents.length
        if(documents!=null){
            return res.status(200).json({
                success:true,
                msg:"Fetched succe ssfully",
                count,
                documents
            })
        }else{
            return next(new ErrorHandler("Could not be fetched"))
        }
        })
}