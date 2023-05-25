const catchAsyncErrors=require("../middlewares/catchAsyncErrors")
const ErrorHandler = require("../utils/ErrorHandler")
const apiQuery = require("./apiQuery")

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
       
        let filter={}
        const features=new apiQuery(Model.find(filter),req.query).filter().sort().limitFields().pagination()

        const data=await features.documents
        let count=data.length
        if(data!=null){
            return res.status(200).json({
                success:true,
                msg:"Fetched successfully",
                count,
                data
            })
        }else{
            return next(new ErrorHandler("Could not be fetched"))
        }
        })
}