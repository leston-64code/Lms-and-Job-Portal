const User=require("../models/userModel")
const jwt=require("jsonwebtoken")
const catchAsyncErrors = require("./catchAsyncErrors");
const ErrorHandler = require("../utils/ErrorHandler");

const authMiddleware=catchAsyncErrors(async(req,res,next)=>{
    let token;
    if(!req.headers.authorization){
        return next(new ErrorHandler("Login to access",400))
    }
    if(req.headers.authorization.startsWith("Bearer")){
        token=req.headers.authorization.split(" ")[1]
        try {
            if(token){
                const decoded=jwt.verify(token,process.env.JWT_SECRET)
                // console.log(decoded)
                const user=await User.findById(decoded.id)
                if(user){
                    req.user=user;
                    // console.log(req.user._id.toString())
                    next()
                }else{
                    return next(new ErrorHandler("Login to access this route",400))
                }
            }
        } catch (error) {
            return next(error)
        }
    }else{
        return next(new ErrorHandler("There is no token attached to header",400))
    }
})

const isAdmin=catchAsyncErrors(async(req,res,next)=>{
    const {email}=req.user
    const adminUser=await User.findOne({email})
    if(adminUser.role==="admin"){
        next()
    }else{
        return next(new ErrorHandler("Unauthorized",401))
    }
})

const isInstructor=catchAsyncErrors(async(req,res,next)=>{
    const {email}=req.user
    const instructor=await User.findOne({email})
    if(instructor.role==="instructor"){
        next()
    }else{
        return next(new ErrorHandler("Unauthorized , only instructors",401))
    }
})

const isBoth=catchAsyncErrors(async(req,res,next)=>{
    const {email}=req.user
    const isBoth=await User.findOne({email})
    if(isBoth.role==="instructor" || isBoth.role==="admin"){
        next()
    }else{
        return next(new ErrorHandler("Unauthorized , only instructors or admins",401))
    }
})

module.exports={authMiddleware,isAdmin,isBoth,isInstructor}