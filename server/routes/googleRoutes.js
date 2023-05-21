const express=require("express")
const User=require("../models/userModel")
const {generateToken}=require("../utils/jwtToken")
const passport=require("passport")
const catchAsyncErrors = require("../middlewares/catchAsyncErrors")

const router=express.Router()

router.route("/login/success").get(catchAsyncErrors(async(req,res,next)=>{
    
}))

router.route("/login/failed").get(catchAsyncErrors(async(req,res,next)=>{

}))

router.route("/google").get(catchAsyncErrors(async(req,res,next)=>{
    await passport.authenticate("google",{
        scope:["profile","email"]
    })
}))

router.route("/auth/google/callback").get(catchAsyncErrors(async(req,res,next)=>{
    await passport.authenticate("google",{
        successMessage:"/login/success",
        failureRedirect:"/login/failed"
    })
}))

router.route("/logout").get(catchAsyncErrors(async(req,res,next)=>{
    req.logOut()
    res.redirect("/")
}))


module.exports=router