const errorMiddleware=(err,req,res,next)=>{
    err.message=err.message || "Internal Server Error"
    err.statusCode=err.statusCode || 500
    console.log(err.code)

    if(err.code===11000){
        err.message="Duplicate Key Error"
        err.statusCode=400
    }

    if(err.name==="TokenExpiredError"){
        err.message="Refresh token has expired"
        err.statusCode=400
    }

    return res.status(err.statusCode).json({
        success:false,
        name:err.name,
        message:err.message
    })
}

module.exports=errorMiddleware