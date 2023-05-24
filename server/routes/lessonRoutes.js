const express=require("express")
const {authMiddleware,isBoth} = require("../middlewares/authMiddleware")
const { createLesson } = require("../controllers/lessonCtrl")

const router=express.Router()

router.route("/create/:id").post(authMiddleware,isBoth,createLesson)

module.exports=router