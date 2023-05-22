const express=require("express")
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware")
const { createDoc, deleteADoc, updateADoc, getAllDocs, getADoc } = require("../controllers/docsCtrl")


const router=express.Router()

router.route("/post").post(authMiddleware,isAdmin,createDoc)
router.route("/getone/:slug").get(getADoc)
router.route("/getall").get(getAllDocs)
router.route("/update/:id").put(authMiddleware,isAdmin,updateADoc)
router.route("/delete/:id").delete(authMiddleware,isAdmin,deleteADoc)

module.exports=router