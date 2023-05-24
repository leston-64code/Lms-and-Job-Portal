const express=require("express")
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware")
const { createCategory, updateCategory, deleteCategory, getOneCategory, getAllCategories } = require("../controllers/blogCatCtrl")

const router=express.Router()

router.route("/create").post(authMiddleware,isAdmin,createCategory)
router.route("/update/:id").put(authMiddleware,isAdmin,updateCategory)
router.route("/delete/:id").delete(authMiddleware,isAdmin,deleteCategory)
router.route("/getone/:slug").get(getOneCategory)
router.route("/getall").get(getAllCategories)

module.exports=router