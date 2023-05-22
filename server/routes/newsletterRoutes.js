const express=require("express")
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware")
const { subscribe, unSubscribe } = require("../controllers/newsletterCtrl")

const router=express.Router()

router.route("/sub").post(authMiddleware,subscribe)
router.route("/unsub/:id").delete(authMiddleware,unSubscribe)

module.exports=router