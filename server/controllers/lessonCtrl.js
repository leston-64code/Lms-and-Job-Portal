const catchAsyncErrors = require("../middlewares/catchAsyncErrors")
const Course=require("../models/courseModel")
const Lesson=require("../models/lessonModel")
const slugify=require("slugify")
const ErrorHandler = require("../utils/ErrorHandler")


exports.createLesson=catchAsyncErrors(async(req,res,next)=>{
    const courseID=req.params.id
    const findCourse=await Course.findById(courseID)
    if(req.body.title){
        req.body.slug=slugify(req.body.title.toLowerCase())
    }
    if(findCourse!=null){
        const lesson=await Lesson.create(req.body)
        findCourse.lessons.push(lesson._id)
        await findCourse.save()

        return res.status(200).json({
            success:true,
            msg:"Lesson added successfully",
            lesson
        })
        
    }else{
        return next(new ErrorHandler("Course not found",400))
    }
    
})

exports.deleteLesson=catchAsyncErrors(async(req,res,next)=>{
    const {courseID,lessonID}=req.params

    const course=await Course.findByIdAndUpdate(courseID,{
        $pull:{lessons:lessonID}
    },{new:true})
    const lesson=await Lesson.findByIdAndDelete(lessonID)

    if(course!=null && lesson!=null){
        return res.status(200).json({
            success:true,
            msg:"Lesson deleted successfully"
        })
    }else{
        return next(new ErrorHandler("Could not delete the lesson",400))
    }
})

exports.updateLesson=catchAsyncErrors(async(req,res,next)=>{
    const {lessonID}=req.params
    if(req.body.title){
        req.body.slug=slugify(req.body.title.toLowerCase())
    }
 
    const lesson=await Lesson.findByIdAndUpdate(lessonID,req.body,{new:true})

    if(lesson!=null){
        return res.status(200).json({
            success:true,
            msg:"Lesson updated successfully",
            lesson
        })
    }else{
        return next(new ErrorHandler("Could not update the lesson",400))
    }
})

exports.getLesson=catchAsyncErrors(async(req,res,next)=>{
    const {lessonID}=req.params
    const lesson=await Lesson.findById(lessonID)
    if(lesson!=null){
        return res.status(200).json({
            success:true,
            msg:"Lesson fetched successfully",
            lesson
        })
    }else{
        return next(new ErrorHandler("Lesson not found",400))
    }
})

exports.getAllLessons=catchAsyncErrors(async(req,res,next)=>{
    const {courseID}=req.params
    const lessons=await Course.findById(courseID).select("lessons").populate("lessons")

    if(lessons!=null){
        return res.status(200).json({
            success:true,
            msg:"Lessons fetched successfully",
            lessons
        })
    }else{
        return next(new ErrorHandler("Lessons not found",400))
    }
})