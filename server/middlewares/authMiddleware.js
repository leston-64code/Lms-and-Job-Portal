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

module.exports={authMiddleware,isAdmin}