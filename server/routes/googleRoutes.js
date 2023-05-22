const express=require("express")
// const User=require("../models/userModel")
// const {generateToken}=require("../utils/jwtToken")
const passport=require("passport")
const catchAsyncErrors = require("../middlewares/catchAsyncErrors")

const router=express.Router()

router.route("/login/success").get(catchAsyncErrors(async(req,res,next)=>{
    res.status(401).json({
        success:true,
        msg:"Login success"
    })
}))

router.route("/login/failed").get(catchAsyncErrors(async(req,res,next)=>{
    res.status(401).json({
        success:false,
        msg:"Login failed"
    })
}))

// ************ These methods are not working because passport is a middleware not a controller function

// router.route("/auth/google").get(async(req,res,next)=>{
//     console.log("Hello")
//     await  passport.authenticate("google",{
//         scope:["profile","email"]
//     })
//     console.log("done")
// })

router.get("/auth/google",passport.authenticate("google",{
    scope:["email","profile"]
}))

// router.route("/auth/google/callback").get(
//     // console.log("hi iam")
//      passport.authenticate("google",{
//         successRedirect:"/login/success",
//         failureRedirect:"/login/failed"
//     }))

router.get("/auth/google/callback",passport.authenticate("google",{
    successRedirect:"/login/success",
    failureRedirect:"/login/failed"
}))

router.route("/logout").get(catchAsyncErrors(async(req,res,next)=>{
    req.logOut()
    res.redirect("/")
}))


module.exports=router