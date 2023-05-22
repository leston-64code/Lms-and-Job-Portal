// const GoogleStratery=require("passport-oauth2").Strategy
const GoogleStrategy=require("passport-google-oauth20").Strategy
const passport=require("passport")
const User=require("../models/userModel")


passport.use(new GoogleStrategy(
    {
        // clientID:process.env.GOOGLE_OAUTH_CLIENT_ID,
        clientID:"11572693298-34q6fv8hj5anlsn2aab5mevdfd4qd0mg.apps.googleusercontent.com",
        // clientSecret:process.env.GOOGLE_OAUTH_CLIENT_SECRET,
        clientSecret:"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",
        callbackURL:"http://localhost:5000/auth/google/callback",
        // scope:["profile","email"]
    }
,async (accessToken, refreshToken, profile, cb)=>{
    console.log(accessToken,profile)
    return cb(null,profile)
}))



passport.serializeUser((user,done)=>{
    done(null,user)
})

passport.deserializeUser((user,done)=>{
    done(null,user)
})