const catchAsyncErrors = require("../middlewares/catchAsyncErrors")
const Course=require("../models/courseModel")
const Lesson=require("../models/lessonModel")
const slugify=require("slugify")


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