const nodemailer=require("nodemailer")
const catchAsyncErrors = require("../middlewares/catchAsyncErrors")

exports.sendEmail=catchAsyncErrors(async(data,req,res)=>{

    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, 
      auth: {
        user: process.env.MAIL_ID, 
        pass: process.env.MP, 
      },
    });
  
    
    let info = await transporter.sendMail({
      from: 'LMS', 
      to: data.to, 
      subject: data.subject, 
      text: data.text, 
      html: data.html?data.html:null, 
    });
  
    console.log("Message sent: %s", info.messageId);
    
  
   
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  
})
  
