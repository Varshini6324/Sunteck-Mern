import exp from "express"
import { authenticate ,register} from "../services/authservice.js"
import { ArticleModel } from "../models/ArticleModel.js"
import {verifyToken} from "../middlewares/verifyToken.js"
export const userRoute=exp.Router()

//register user
userRoute.post('/users',async(req,res)=>{
    //let user obj from req
    let userObj=req.body
    //call register
    const newUserObj=await register({...userObj,role:"USER"})
    //send res
    res.status(201).json({message:"user created",payload:newUserObj})
})



//read all articles(protected)
userRoute.get('/articles',verifyToken,async(req,res)=>{
    //get all articles
    let article=await ArticleModel.find({isArticleActive:true}).populate("author","firstName email")
    //send res
    res.status(200).json({message:"Articles",payload:article})
})



//add comment to an article (protected)
userRoute.put('/articles',verifyToken,async(req,res)=>{
    //get modified article from req
    let {articleId,comment}=req.body
    //find article  
    let articleOfDB=await ArticleModel.findOne({_id:articleId})
    if(!articleOfDB){
        return res.status(404).json({message:"Article not found"})
    }
    //update the article
    let updatedArticle=await ArticleModel.findByIdAndUpdate(articleId,
        {$push:{comment:{
          user: req.user.userId,   // from verifyToken
          comment: comment
        }}},
        {new:true})
    //send res
    res.status(200).json({message:"Modified article",payload:updatedArticle})
})
