// const GoogleStratery=require("passport-oauth2").Strategy
const GoogleStrategy=require("passport-google-oauth20").Strategy
const passport=require("passport")
const User=require("../models/userModel")
require("dotenv").config()

passport.use(new GoogleStrategy(
    {
        clientID:process.env.GOOGLE_OAUTH_CLIENT_ID,
        clientSecret:process.env.GOOGLE_OAUTH_CLIENT_SECRET,
        callbackURL:"http://localhost:5000/auth/google/callback",
    }
,async (accessToken, refreshToken, profile, cb)=>{

    let data=profile?._json
    console.log(data.email)
    const user=await User.findOne({email:data.email})
    console.log(user)
    if(user){
        return await cb(null,user)
    }else{
        const newuser=await User.create({
            firstname:data.name,
            lastname:data.family_name,
            email:data.email,
            picture:data.picture,
            role:"user"
        })
        return await cb(null,newuser)
    }
    
}))


passport.serializeUser((user,done)=>{
    done(null,user)
})

passport.deserializeUser((user,done)=>{
    done(null,user)
})