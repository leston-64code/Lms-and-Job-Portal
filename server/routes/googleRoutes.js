const express=require("express")
const User=require("../models/userModel")
const generateToken=require("../utils/jwtToken")
const passport=require("passport")
const catchAsyncErrors = require("../middlewares/catchAsyncErrors")

const router=express.Router()

router.route("/login/success").get(catchAsyncErrors(async(req,res,next)=>{
    if(req.user){
        const findUser=await User.findOne({email:req.user.email})
        if(findUser){
            return res.status(200).json({
                success:true,
                msg:"Login success",
                token:generateToken(findUser._id),
                user:findUser
            })
        }
    }else{
        throw new Error("Something went wrong")
    }
}))

router.route("/login/failed").get(catchAsyncErrors(async(req,res,next)=>{
    return res.status(401).json({
        success:false,
        msg:"Login failed"
    })
}))


router.get("/auth/google",passport.authenticate("google",{
    scope:["email","profile"]
}))


router.get("/auth/google/callback",passport.authenticate("google",{
    successRedirect:"/login/success",
    failureRedirect:"/login/failed"
}))


router.route("/logout").get(catchAsyncErrors(async(req,res,next)=>{
    req.logOut()
    res.redirect("/")
}))


module.exports=router