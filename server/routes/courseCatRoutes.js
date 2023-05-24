const express=require("express")
const { authMiddleware, isAdmin ,isBoth} = require("../middlewares/authMiddleware")
const { createCategory, updateCategory, deleteCategory, getOneCategory, getAllCategories } = require("../controllers/courseCatCtrl")

const router=express.Router()

router.route("/create").post(authMiddleware,isBoth,createCategory)
router.route("/update/:id").put(authMiddleware,isBoth,updateCategory)
router.route("/delete/:id").delete(authMiddleware,isBoth,deleteCategory)
router.route("/getone/:slug").get(getOneCategory)
router.route("/getall").get(getAllCategories)

module.exports=router