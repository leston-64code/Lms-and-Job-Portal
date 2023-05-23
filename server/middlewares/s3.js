const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const fs=require("fs")

exports.s3Service=async(req,res,next)=>{

    const client = new S3Client();
    
    Promise.all(req.compressedImgs.map(async(ele,index)=>{

        const readableStream=fs.createReadStream(ele.path)
        const params = {
            Bucket:process.env.AWS_BUCKET_NAME,
            Key:`uploads/bimgs/${ele.name}`,
            Body:readableStream
        };
        return await client.send(new PutObjectCommand(params))

    })).then((data)=>{
        next()
    }).catch((error)=>{
        console.log(error)
    })
    

}