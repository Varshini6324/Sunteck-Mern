import exp from "express";
import { authenticate } from "../services/authservice.js";
import { UserTypeModel } from "../models/UserModel.js";
import bcrypt from "bcryptjs";
export const commonRoute=exp.Router()

//login
commonRoute.post('/login',async(req,res)=>{
    //get user cres object
        let userCred=req.body
        //
        let {token,user}=await authenticate(userCred)
        //save token as httpOnly cookie
        res.cookie("token",token,{
            httpOnly:true,
            sameSite:'lax',
            secure:false
        })
        //send res
        res.status(200).json({message:"Authenticate successfull",payload:user})
})


//logout
commonRoute.get('/logout',(req,res)=>{
    //clear the cookie named 'token'
    res.clearCookie('token',{
        httpOnly:true,
        secure:false,
        sameSite:'lax'
    })
    res.status(200).json({message:"Logout successfull"})
})


//Change Password
commonRoute.put('/change-password',async(req,res)=>{
    
    //get current password and new password
    let {email,currentPassword,newPassword}=req.body
    //check email and currentPassword
    const user=await UserTypeModel.findOne({email})
    if (!user){
        const err=new Error("Invalid email")
        err.status=401
        throw err
    }
    //compare password
    if(currentPassword===newPassword || newPassword==="" || currentPassword===""){
        const err=new Error("Give a valid Password")
        err.status=401
        throw err
    }
    const isMatch=await bcrypt.compare(currentPassword,user.password)
    if(!isMatch ){
        const err=new Error("Invalid password")
        err.status=401
        throw err
    }
    
    
    let updatedPassword=await bcrypt.hash(newPassword,10)
    //replace current password with new password
    let updateUser=await UserTypeModel.findOneAndUpdate(user._id,{$set:{password:updatedPassword}},{new:true})
    //send res
    res.status(200).json({message:"Password Changed Successfully",Payload:updateUser})
})