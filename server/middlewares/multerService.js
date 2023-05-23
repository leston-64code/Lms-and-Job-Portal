const multer=require("multer")

const storage = multer.diskStorage({

    destination: function (req, file, cb) {
      cb(null, '../uploads')
    },

    filename: function (req, file, cb) {
  
      const ext=file.mimetype.split("/")[1]
      const uniqueSuffix = Date.now()+"e"+Math.round(Math.random() * 1E9) 
      cb(null,uniqueSuffix +"."+ext)
    }

  })


const upload = multer({ storage: storage }).fields([{name:"files",maxCount:10}])

module.exports=upload