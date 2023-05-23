const express=require("express")
const { createBlog, updateBlog, getBlog, getAllBlogs, deleteBlog, likeBlog, disLikeBlog, uploadBlogImages, deleteBlogImage } = require("../controllers/blogController")
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware")
const upload = require("../middlewares/multerService")
const { sharpComperssionService } = require("../middlewares/sharpService")
const { s3Service } = require("../middlewares/s3")

const router=express.Router()

router.route("/create").post(authMiddleware,isAdmin,createBlog)
router.route("/update/:id").put(authMiddleware,isAdmin,updateBlog)
router.route("/getblog/:id").get(getBlog)
router.route("/getallblogs").get(getAllBlogs)
router.route("/delete/:id").delete(authMiddleware,isAdmin,deleteBlog)
router.delete("/deleteimg/:id",authMiddleware,isAdmin,deleteBlogImage)
router.route("/likeblog").put(authMiddleware,likeBlog)
router.route("/dislikeblog").put(authMiddleware,disLikeBlog)
router.route("/uploadimages/:id").put(authMiddleware,isAdmin,upload,sharpComperssionService,s3Service,uploadBlogImages)

module.exports=router