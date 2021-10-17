const Users = require('../models/userModel')
const bcrypt= require('bcrypt')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer');
const fetch = require('node-fetch')
const option = {
    service: 'gmail',
    auth: {
        user: 'dinhphi751@gmail.com', // email hoặc username
        pass: 'Dinhtruongphi1234' // password
    }
};

const transporter = nodemailer.createTransport(option);
const userCtrl = {
register: async (req,res) =>{
  try{
    const {name,email,password} = req.body;
  
    const verifytoken = jwt.sign({email: req.body.email}, "bezkoder-secret-key")
    const user = await Users.findOne({email})
    
    const mail = {
        from: option.auth.user, // Địa chỉ email của người gửi
        to: email, // Địa chỉ email của người nhaan
        subject: 'Please confirm your account ', // Tiêu đề mail
        html: `<h1>Email Confirmation</h1>
        <h2>Hello ${name}</h2>
        <p>Cảm ơn bạn đã đăng kí , vui lòng click vào link dưới để kích hoạt tài khoản </p>
        <a href='http://localhost:3000/user/auth/verify/${verifytoken}'> Click here</a>
        </div>`, // Nội dung mail dạng wtext
    };
    if(user) return res.status(400).json({msg: "The Email already exits"})
    
    if(password.length < 6 ) return res.status(400).json({msg: "Password is at least 6 characters long "})

    // Password Encryption
    const passwordHash = await bcrypt.hash(password,10)
    const newUser = new Users({
        name,email,password:passwordHash,
        confirmationCode: verifytoken,
        status:'Pending'
    })
    // save mongo

    newUser.save(); 
    
      transporter.sendMail(mail, function(error, info) {
        if (error) { // nếu có lỗi
        } else { //nếu thành công
        }
    });
    // send mail
    
    // accessToken
   // accessToken
   
   
    res.json({msg:"Register Success",'confirmationCode':verifytoken})
}

  catch(err) {
      res.status(400).json({msg:err.message})
      return res.status(400).json({msg: err.message})
  }
},
login : async(req,res)=>{
    try {
        const {email,password} = req.body;
        const user = await Users.findOne({email})
        if(!user) return res.status(400).json({msg:"User does not exit."})
        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch) return res.status(400).json({msg:"Password is incorret"})
        // If login success,create accesstoken and refresh token
        res.json({msg:"Login Success",user,'verifyToken':user.confirmationCode})
      
       
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
},  
verify : async(req,res)=>{
    try {
            const {activation_token} = req.body
            const user = jwt.verify(activation_token,"bezkoder-secret-key")

            const {name, email, password} = user

            const check = await Users.findOne({email})
            if(check.status === "Pending") {
                await Users.findOneAndUpdate({email},{status:"Active"})
                return res.json({msg : "Active account successfully"})
            }
            if(check.status === "Active") {
                return res.status(400).json({msg:"Your account has been activated"})
            }

           

           

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
},
}

module.exports = userCtrl