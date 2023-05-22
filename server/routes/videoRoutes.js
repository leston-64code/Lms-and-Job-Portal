const express=require("express")
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware")
const { postVideo, getAVideo, getAllVideos, updateAVideo, deleteAVideo } = require("../controllers/videoCtrl")

const router=express.Router()

router.route("/post").post(authMiddleware,isAdmin,postVideo)
router.route("/getone/:slug").get(getAVideo)
router.route("/getall").get(getAllVideos)
router.route("/update/:id").put(authMiddleware,isAdmin,updateAVideo)
router.route("/delete/:id").delete(authMiddleware,isAdmin,deleteAVideo)

module.exports=router