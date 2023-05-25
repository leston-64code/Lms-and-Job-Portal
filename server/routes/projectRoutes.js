const express=require("express")
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware")
const { createProject, getProject, getAllProjects, updateProject, deleteProject } = require("../controllers/projectCtrl")

const router=express.Router()

router.route("/post").post(authMiddleware,isAdmin,createProject)
router.route("/getone/:slug").get(authMiddleware,isAdmin,getProject)
router.route("/getall").get(authMiddleware,isAdmin,getAllProjects)
router.route("/update/:id").put(authMiddleware,isAdmin,updateProject)
router.route("/delete/:id").delete(authMiddleware,isAdmin,deleteProject)

module.exports=router