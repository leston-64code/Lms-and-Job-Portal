const express=require("express")
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware")
const { postDetails, updateDetails, deleteDetails, getDetail, getAllDetails } = require("../controllers/workCtrl")

const router=express.Router()

router.route("/post").post(authMiddleware,postDetails)
router.route("/getone/:id").get(authMiddleware,getDetail)
router.route("/getall").get(authMiddleware,isAdmin,getAllDetails)
router.route("/update/:id").put(authMiddleware,updateDetails)
router.route("/delete/:id").delete(authMiddleware,isAdmin,deleteDetails)

module.exports=router