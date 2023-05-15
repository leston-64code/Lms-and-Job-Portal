const mongoose=require("mongoose")

const connectDB=()=>{
    try {
        mongoose.connect(process.env.MONGO_URI).then(()=>{
            console.log("Connected to DB")
        }).catch((error)=>{
            console.log(error)
        })
    } catch (error) {
        throw new Error(error)
    }
}

module.exports=connectDB