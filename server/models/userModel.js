const mongoose=require("mongoose")
const bcrypt=require("bcryptjs")
const crypto=require("crypto")

// New User Schema
let userSchema=new mongoose.Schema({
    firstname:{
        type:String,
        required:true,
        index:true
    },
    lastname:{
        type:String,
        required:true,
        index:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    mobile:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        select:false,
    },
    role:{
        type:String,
        default:"user"
    },
    isBlocked:{
        type:Boolean,
        default:false
    },
    refreshToken:{
        type:String
    },
    passwordChangedAt:Date,
    passwordResetToken:String,
    passwordResetExpires:Date,
    stripeAccountId:String,
    stripeSeller:{},
    stripeSession:{}
},
    {
        timestamps:true
    }
)


userSchema.pre("save",async function(next){
    // if password is not modified then don't encrypt again
    if(!this.isModified("password")){
        next()
    }
    const salt=await bcrypt.genSaltSync(10)
    this.password=await bcrypt.hash(this.password,salt)
    next()
})

userSchema.methods.isPasswordMatched=async function(enteredPass){
    return await bcrypt.compare(enteredPass,this.password)
}

userSchema.methods.createPasswordResetToken=async function(){
    const resetToken=crypto.randomBytes(32).toString("hex")
    this.passwordResetToken=crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex")
    this.passwordResetExpires=Date.now()+30*60*1000  // 10 minutes
    return resetToken
}

module.exports=mongoose.model("User",userSchema)