const express=require("express")
const { postTutorialCaterogy, getAllTutCaterogy, getOneTutCaterogy, updateOneTutCaterogy, deleteOneTutCaterogy } = require("../controllers/tutCatCtrl")
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware")

const router=express.Router()

router.route("/create").post(authMiddleware,isAdmin,postTutorialCaterogy)
router.route("/getall").get(authMiddleware,isAdmin,getAllTutCaterogy)
router.route("/getone/:id").get(authMiddleware,isAdmin,getOneTutCaterogy)
router.route("/update/:id").put(authMiddleware,isAdmin,updateOneTutCaterogy)
router.route("/delete/:id").delete(authMiddleware,isAdmin,deleteOneTutCaterogy)


module.exports=router