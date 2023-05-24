const catchAsyncErrors = require("../middlewares/catchAsyncErrors")
const Course=require("../models/courseModel")
const slugifiy=require("slugify")
const ErrorHandler = require("../utils/ErrorHandler")


exports.createCourse=catchAsyncErrors(async(req,res,next)=>{
    const {_id}=req.user

    if(req.body.title){
        req.body.slug=slugifiy(req.body.title.toLowerCase())
    }
    if(_id){
        req.body.instructor=_id
    }
    const course=await Course.create(req.body)
    if(course!=null){
        return res.status(200).json({
            success:true,
            msg:"Course created successfully",
            course
        })
    }else{
        return next(new ErrorHandler("Could not be created",400))
    }
})

exports.getAllCoursesByCategory=catchAsyncErrors(async(req,res,next)=>{
    const {category}=req.params
    const courses=await Course.find({category})
    const count=courses.length
    if(courses!=null){
        return res.status(200).json({
            success:true,
            count, 
            courses
        })
    }else{
        return next(new ErrorHandler("Course not found",400))
    }
})

exports.getAllCourses=catchAsyncErrors(async(req,res,next)=>{
   
    const courses=await Course.find()
    const count=courses.length
    if(courses!=null){
        return res.status(200).json({
            success:true,
            count, 
            courses
        })
    }else{
        return next(new ErrorHandler("Courses not found",400))
    }
})

exports.updateCourse=catchAsyncErrors(async(req,res,next)=>{
    const {id}=req.params
    if(req.body.title){
        req.body.slug=slugifiy(req.body.title.toLowerCase())
    }
    const course=await Course.findByIdAndUpdate(id,req.body,{new:true})
    if(course!=null){
        return res.status(200).json({
            success:true,
            msg:"Course updated successfully",
            course
        })
    }else{
        return next(new ErrorHandler("Course not found",400))
    }
})

exports.deleteCourse=catchAsyncErrors(async(req,res,next)=>{
    const {id}=req.params

    const course=await Course.findByIdAndDelete(id)
    if(course!=null){
        return res.status(200).json({
            success:true,
            msg:"Course deleted successfully",
            course
        })
    }else{
        return next(new ErrorHandler("Course not found",400))
    }
})

exports.getACourse=catchAsyncErrors(async(req,res,next)=>{
    const {slug}=req.params
 
    const course=await Course.findOne({slug:slug})
    if(course!=null){
        return res.status(200).json({
            success:true,
            msg:"Course fetched successfully",
            course
        })
    }else{
        return next(new ErrorHandler("Course not found",400))
    }
})

exports.getParticluarInstructorCourses=catchAsyncErrors(async(req,res,next)=>{
    const _id=req.user._id
    const courses=await Course.find({instructor:_id})
    const count=courses.length
    if(courses!=null){
        return res.status(200).json({
            success:true,
            count, 
            courses
        })
    }else{
        return next(new ErrorHandler("Courses not found",400))
    }
})
