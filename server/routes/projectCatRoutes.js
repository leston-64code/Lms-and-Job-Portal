const express=require("express")
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware")
const { deleteCategory, updateCategory, getAllCategories, getCategory, createCategory } = require("../controllers/projectCatCtrl")


const router=express.Router()

router.route("/post").post(authMiddleware,isAdmin,createCategory)
router.route("/getone/:slug").get(authMiddleware,isAdmin,getCategory)
router.route("/getall").get(authMiddleware,isAdmin,getAllCategories)
router.route("/update/:id").put(authMiddleware,isAdmin,updateCategory)
router.route("/delete/:id").delete(authMiddleware,isAdmin,deleteCategory)

module.exports=router