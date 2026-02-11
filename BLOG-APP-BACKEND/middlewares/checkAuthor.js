import {UserTypeModel} from '../models/UserModel.js'
export const checkAuthor=async(req,res,next)=>{
    //get author id
    const authorid=req.body?.author || req.params?.authorid
    //check the author
    let author=await UserTypeModel.findById(authorid)
    if(!author || author.role!=="AUTHOR"){
       return res.status(401).json({message:"Inavlid User"})
    }
    //if author found but role is different
    if(author.role!=="AUTHOR"){
        return res.status(403).json({message:"author is not author"})
    }
    //if author blocked
    if(!author.isActive){
        return res.status(403).json({message:"Author account is not active"})
    }
    //forward to next
    next()
}