const express=require("express")
const {authMiddleware,isBoth} = require("../middlewares/authMiddleware")
const { createLesson, deleteLesson, getLesson, updateLesson, getAllLessons } = require("../controllers/lessonCtrl")

const router=express.Router()

router.route("/create/:id").post(authMiddleware,isBoth,createLesson)
router.route("/delete/:courseID/:lessonID").delete(authMiddleware,isBoth,deleteLesson)
router.route("/getone/:lessonID").get(authMiddleware,isBoth,getLesson)
router.route("/update/:lessonID").put(authMiddleware,isBoth,updateLesson)
router.route("/getall/:courseID").get(getAllLessons)

module.exports=router