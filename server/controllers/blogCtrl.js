const catchAsyncErrors = require("../middlewares/catchAsyncErrors")
const Blog=require("../models/blogModel")
const ErrorHandler = require("../utils/ErrorHandler")
const path=require("path")
const fs=require("fs")
const { url } = require("inspector")



exports.createBlog=catchAsyncErrors(async(req,res,next)=>{
    const newBlog= await Blog.create(req.body)
        res.status(200).json({
            success:true,
            newBlog
        })
    
})

exports.updateBlog=catchAsyncErrors(async(req,res,next)=>{
    const {id}=req.params
    const updatedBlog=await Blog.findByIdAndUpdate(id,req.body,{
        new:true
    })

    if(updatedBlog!=null){

       return res.status(200).json({
            success:true,
            updatedBlog
        })
    }else{
        return next(new ErrorHandler("Blog could not be updated",400))
    }

})

exports.getBlog=catchAsyncErrors(async(req,res,next)=>{
    const {id}=req.params
    const getBlog=await Blog.findById(id).populate("likes","firstname email").populate("dislikes","firstname email")
    await Blog.findByIdAndUpdate(id,{$inc:{numOfViews:1}},{
        new:true
    })
    return res.status(200).json({
        success:true,
        getBlog
    })
})

exports.getAllBlogs=catchAsyncErrors(async(req,res,next)=>{

    const blogs=await Blog.find()
    const blogCount=await Blog.countDocuments()

    return res.status(200).json({
        success:true,
        blogCount,
        blogs
    })
})

exports.deleteBlog=catchAsyncErrors(async (req,res,next)=>{
    const {id}=req.params
    const blog=await Blog.findById(id)

    for(let i=0;i<blog.images.length;i++){
        let ele=blog.images[i]
        await cloudinary.uploader.destroy(ele.public_id,{resource_type:"image"}).then((res)=>{
            console.log(res)
        }).catch((error)=>{
            return next(error)
        })
    }

    const deletedblog=await blog.remove()
    
    if(deletedblog){
        return res.status(200).json({
            success:true,
            deletedblog
        })
    }else{
        return next(new ErrorHandler("Could not be deleted",400))
    }
    
})

exports.deleteBlogImage=catchAsyncErrors(async(req,res,next)=>{
    const {public_id}=req.query
    const blogID=req.params.id
    const blog=await Blog.findById(blogID)
    const newImgs=[]
    for(let i=0;i<blog.images.length;i++){
        let ele=blog.images[i]
        if(ele.public_id!=public_id){
            newImgs.push(ele)
        }else{
            await cloudinary.uploader.destroy(public_id,{resource_type:"image"}).then((res)=>{
                console.log(res)
            }).catch((error)=>{
                return next(error)
            })
        }
    }

  try {

    blog.images=newImgs
    await blog.save()

  } catch (error) {
    return next(error)
  }

  return res.status(200).json({
    success:true,
    msg:"Image deleted successfully"
  })

})

exports.likeBlog=catchAsyncErrors(async(req,res,next)=>{
    const {blogID}=req.body
    const blog=await Blog.findById(blogID)
    const loginUserID=req?.user?._id

    const isLiked= blog?.isLiked

    const alreadyDisliked=blog?.dislikes?.forEach((ele,index)=>{
        return ele._id.toString()===loginUserID.toString()
    })

    if(alreadyDisliked){
        const blog=await Blog.findByIdAndUpdate(blogID,{
            $pull:{dislikes:loginUserID},
            isDisliked:false
        },{
            new:true
        })
        if(blog){
            res.status(200).json({success:true,blog})
        }
    }

    if(isLiked){
        const blog=await Blog.findByIdAndUpdate(blogID,{$pull:{likes:loginUserID},isLiked:false},{new:true})
        if(blog){
            res.status(200).json({success:true,blog})
        }
    }else{
        const blog=await Blog.findByIdAndUpdate(blogID,{$push:{likes:loginUserID},isLiked:true},{new:true})
        if(blog){
            res.status(200).json({success:true,blog})
        }
    }


})

exports.disLikeBlog=catchAsyncErrors(async(req,res,next)=>{
    const {blogID}=req.body
    const blog=await Blog.findById(blogID)
    const loginUserID=req?.user?._id

    const isDisLiked= blog?.isDisLiked

    const alreadyLiked=blog?.likes?.forEach((ele,index)=>{
        return ele._id.toString()===loginUserID.toString()
    })

    if(alreadyLiked){
        const blog=await Blog.findByIdAndUpdate(blogID,{
            $pull:{likes:loginUserID},
            isLiked:false
        },{
            new:true
        })
        if(blog){
            res.status(200).json({success:true,blog})
        }
    }

    if(isDisLiked){
        const blog=await Blog.findByIdAndUpdate(blogID,{$pull:{dislikes:loginUserID},isDisLiked:false},{new:true})
        if(blog){
            res.status(200).json({success:true,blog})
        }
    }else{
        const blog=await Blog.findByIdAndUpdate(blogID,{$push:{dislikes:loginUserID},isDisLiked:true},{new:true})
        if(blog){
            res.status(200).json({success:true,blog})
        }
    }


})

exports.uploadBlogImages=catchAsyncErrors(async(req,res,next)=>{

    const id=req.params.id
    const blog=await Blog.findById(id)
  
    if(blog!=null){

        let urls=req.compressedImgs.map((ele,index)=>{
            return `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/uploads/bimgs/${ele.name}`
          })       
    
          for(let i=0;i<req.files.files.length;i++){
            fs.unlink(req.files.files[i].path,(err)=>{
              if(err){
                throw new Error(err)
              }
            })
            fs.unlink(req.compressedImgs[i].path,(err)=>{
              if(err){
                throw new Error(err)
              }
            })
          }
    
            
        for(let i=0;i<urls.length;i++){
            blog.images.push(urls[i])
        }
        await blog.save()
             
        return res.status(200).json({
            success:true,
            msg:"Images added successfully"
        })
        
    }else{

        for(let i=0;i<req.files.files.length;i++){
            fs.unlink(req.files.files[i].path,(err)=>{
              if(err){
                throw new Error(err)
              }
            })
            fs.unlink(req.compressedImgs[i].path,(err)=>{
              if(err){
                throw new Error(err)
              }
            })
          }

        return res.status(400).json({
            success:false,
            msg:"Enter valid details , images not added"
        })
    }
   
})