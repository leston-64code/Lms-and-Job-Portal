const Contact=require("../models/contactModel")
const catchAsyncErrors = require("../middlewares/catchAsyncErrors")
const ErrorHandler = require("../utils/ErrorHandler")


exports.createContact=catchAsyncErrors(async(req,res,next)=>{
    const contact=await Contact.create(req.body)
    if(contact!=null){
        return res.status(200).json({
            success:true,
            contact
        })
    }else{
        return next(new ErrorHandler("Could not be sent",400))
    }
})

exports.getAllEnquires=catchAsyncErrors(async(req,res,next)=>{
  
    const contacts=await Contact.find()
    const count=contacts.length
    if(contacts!=null){
        return res.status(200).json({
            success:true,
            count,
            contacts
        })
    }else{
        return next(new ErrorHandler("Could not find enquires",400))
    }
})

exports.getAEnquiry=catchAsyncErrors(async(req,res,next)=>{
    const id=req.params.id
    const contact=await Contact.findById(id)
    
    if(contact!=null){
        return res.status(200).json({
            success:true,
            contact
        })
    }else{
        return next(new ErrorHandler("Could not find the enquiry",400))
    }
})

exports.deleteAEnquiry=catchAsyncErrors(async(req,res,next)=>{
    const id=req.params.id
    const contact=await Contact.findByIdAndDelete(id)
    
    if(contact!=null){
        return res.status(200).json({
            success:true,
            contact
        })
    }else{
        return next(new ErrorHandler("Could not be deleted",400))
    }
})

exports.updateEnquiryStatus=catchAsyncErrors(async(req,res,next)=>{
    const id=req.params.id
    const contact=await Contact.findByIdAndUpdate(id,{status:req.body.status},{new:true})
    
    
    if(contact!=null){
        return res.status(200).json({
            success:true,
            msg:"Enquiry status updated successfully",
            // contact
        })
    }else{
        return next(new ErrorHandler("Could not be updated",400))
    }
})