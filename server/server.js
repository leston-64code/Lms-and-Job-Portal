const express=require("express")
const connectDB=require("./config/db")
const errorMiddleware = require("./middlewares/errorMiddleware")
const cookieParser=require("cookie-parser")
const session=require("express-session")
const MongoStore=require("connect-mongo")
const morgan=require("morgan")
const passport = require("passport")
const passportSetup=require("./utils/passport")

const app=express()
require("dotenv").config()

connectDB()

app.use(session({
    resave:false,
    saveUninitialized:false,
    secret:"mysecret",
    store:MongoStore.create({
        mongoUrl:process.env.MONGO_URI,
        ttl:12*60*60
    })
}))

app.use(passport.initialize())
app.use(passport.session())

// Middlewares
app.use(morgan("dev"));
app.use(express.json())
app.use(cookieParser())

app.use("/api/user",require("./routes/authRoutes"))
app.use("/api/tutorial/category",require("./routes/tutCatRoutes"))
app.use("/api/tutorial",require("./routes/tutorialRoutes"))
app.use("/api/newsletter",require("./routes/newsletterRoutes"))
app.use("/api/reviews",require("./routes/reviewsRoutes"))
app.use("/api/contact",require("./routes/contactRoutes"))
app.use("/api/videos",require("./routes/videoRoutes"))
// app.use("/api/product",require("./routes/productRoutes"))
app.use("/",require("./routes/googleRoutes"))

app.get("/",(req,res,next)=>{
    return res.send(`<a href="http://localhost:5000/auth/google"> Login with google </a>`)
})

app.use(errorMiddleware)

const PORT=process.env.PORT || 4000
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})

