import jwt from 'jsonwebtoken'
import {config} from 'dotenv'
config()
export const verifyToken=async(req,res,next)=>{
    //read token from req
    let token=req.cookies.token
    if(token===undefined){
        return res.status(400).json({message:"Unauthorized request.Please Login"})
    }
    //verify the validity of the token(decoding the token)
    let decodedToken=jwt.verify(token,process.env.JW_SECRET)
    //forward req to next middleware
    req.user=decodedToken
    next()
}