const express=require("express")
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware")
const { createContact, getAllEnquires, getAEnquiry, deleteAEnquiry, updateEnquiryStatus } = require("../controllers/contactCtrl")


const router=express.Router()

router.route("/create").post(createContact)
router.route("/getall").get(authMiddleware,isAdmin,getAllEnquires)
router.route("/getone/:id").get(authMiddleware,isAdmin,getAEnquiry)
router.route("/delete/:id").delete(authMiddleware,isAdmin,deleteAEnquiry)
router.route("/update/:id").put(authMiddleware,isAdmin,updateEnquiryStatus)

module.exports=router