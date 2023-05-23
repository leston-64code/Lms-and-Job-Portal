const sharp=require("sharp")

exports.sharpComperssionService=async(req,res,next)=>{
    try {
         if(req.files){
         
            req.compressedImgs=[]

            Promise.all(req.files.files.map(async(ele,index)=>{
                let prefix=ele.filename.split(".")[0]
                let name=prefix+".webp"
                req.compressedImgs.push({
                    path:`../uploads/converted/${name}`,
                    name
                })

                return await sharp(ele.path).webp({quality:80}).toFile(`../uploads/converted/${name}`)
                
            })).then(()=>{
                next()
            }).catch((error)=>{
                console.log(error)
            })

        }
    } catch (error) {
        console.log(error)
    }
}