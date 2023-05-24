const express=require("express")
const {authMiddleware,isBoth} = require("../middlewares/authMiddleware")
const { createCourse, getAllCourses, getAllCoursesByCategory, updateCourse, getACourse, deleteCourse, getParticluarInstructorCourses } = require("../controllers/courseCtrl")

const router=express.Router()

router.route("/create").post(authMiddleware,isBoth,createCourse)
router.route("/getall/:category").get(getAllCoursesByCategory)
router.route("/getall").get(getAllCourses)
router.route("/update/:id").put(authMiddleware,isBoth,updateCourse)
router.route("/getone/:slug").get(getACourse)
router.route("/getmycourses").get(authMiddleware,isBoth,getParticluarInstructorCourses)
router.route("/delete/:id").delete(authMiddleware,isBoth,deleteCourse)

module.exports=router