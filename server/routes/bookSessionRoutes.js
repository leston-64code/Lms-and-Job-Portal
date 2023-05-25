const express=require("express")
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware")
const { createSession, getSession, getAllSessions, updateSession, deleteSession } = require("../controllers/bookSessionCtrl")

const router=express.Router()

router.route("/post").post(authMiddleware,createSession)
router.route("/getone/:id").get(authMiddleware,getSession)
router.route("/getall").get(authMiddleware,isAdmin,getAllSessions)
router.route("/update/:id").put(authMiddleware,updateSession)
router.route("/delete/:id").delete(authMiddleware,isAdmin,deleteSession)

module.exports=router