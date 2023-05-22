const express=require("express")
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware")
const { createReview, getAllReviews, getAReview, deleteAReview, updateReviewStatus } = require("../controllers/reviewController")


const router=express.Router()

router.route("/create").post(authMiddleware,createReview)
router.route("/getall").get(getAllReviews)
router.route("/getone/:id").get(authMiddleware,isAdmin,getAReview)
router.route("/delete/:id").delete(authMiddleware,isAdmin,deleteAReview)
router.route("/update/:id").put(authMiddleware,isAdmin,updateReviewStatus)

module.exports=router