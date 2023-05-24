const rateLimit = require('express-rate-limit')

function RateLimiter(time,timetype,maxReq,message){
    let limiter = rateLimit({
        windowMs:time || 15 * 60 *1000,
        max: maxReq || 50, 
        standardHeaders: true, 
        legacyHeaders: false,
        message:{
            status:false,
            code:"TOO_MANY_REQUESTS",   
            message:message ? `${message} . Please try again after ${time+" "+timetype}` : `Too many requests . Please try again after ${time?time+" "+timetype:"15 minutes"}`
        } 
    })
    return limiter
}


module.exports=RateLimiter

