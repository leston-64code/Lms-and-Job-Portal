const express=require("express")
const { createTutorial, getAllTutorials, getOneTutorial, upadateATutorial, deleteATutorial } = require("../controllers/tutorialCtrl")
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware")

const router=express.Router()

router.route("/create").post(authMiddleware,isAdmin,createTutorial)
router.route("/getall").get(getAllTutorials)
router.route("/getone/:id").get(getOneTutorial)
router.route("/update/:id").put(authMiddleware,isAdmin,upadateATutorial)
router.route("/delete/:id").delete(authMiddleware,isAdmin,deleteATutorial)

module.exports=router