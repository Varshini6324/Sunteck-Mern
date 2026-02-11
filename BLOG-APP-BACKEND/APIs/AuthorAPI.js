import exp from "express"
import {ArticleModel} from "../models/ArticleModel.js"
import {authenticate,register} from '../services/authservice.js'
import { UserTypeModel } from "../models/UserModel.js"
import {checkAuthor} from "../middlewares/checkAuthor.js"
import { verifyToken } from "../middlewares/verifyToken.js"
export const authorRoute=exp.Router()

//Register author(public)
authorRoute.post('/users',async(req,res)=>{
    //let user obj from req
    let userObj=req.body
    //call register
    const newUserObj=await register({...userObj,role:"AUTHOR"})
    //send res
    res.status(201).json({message:"author created",payload:newUserObj})
})

//create article(protected)
authorRoute.post('/articles',async(req,res)=>{
    //get article from req
    const newArticle=req.body
    //create article document
    const articleDoc=await ArticleModel(newArticle)
    //save
    let cratedArticleDoc=await articleDoc.save()
    //send res
    res.status(200).json({message:"article created",payload:cratedArticleDoc})
})

//read articles of author(protected)
authorRoute.get('/articles/:authorid',checkAuthor,async(req,res)=>{
    //get author id
    const authorid=req.params.authorid
    
    //read articles by this author
    let article=await ArticleModel.find({author:authorid,isArticleActive:true}).populate("author","firstName email")
    //send res
    res.status(200).json({message:"Articles",payload:article})
})

//edit article(protected)
authorRoute.put('/articles',verifyToken,checkAuthor,async(req,res)=>{
    //get modified article from req
    let {articleId,title,category,content,author}=req.body
    //find article
    let articleOfDB=await ArticleModel.findOne({_id:articleId,author:author})
    if(!articleOfDB){
        return res.status(401).json({message:"Article not found"})
    }
    //update the article
    let updatedArticle=await ArticleModel.findByIdAndUpdate(articleId,{$set:{title,category,content}},{new:true})
    //send res
    res.status(200).json({message:"Modified article",payload:updatedArticle})
})

//delete (soft delete) article (protected)
authorRoute.put('/article',verifyToken,checkAuthor,async(req,res)=>{
    //get id from params
    let {articleid,author}=req.body
    //find article by id
    let articleOfDB=await ArticleModel.findOne({_id: articleid,author: req.user.userId});
    if (!articleOfDB) {
      return res.status(404).json({ message: "Article not found" });
    }
    //isactive to false
    // Soft delete → mark inactive
    const deletedArticle = await ArticleModel.findByIdAndUpdate(articleid,
        { $set: {isArticleActive: false } },
        { new: true });
    //send res

    res.status(200).json({message: "Article soft deleted", payload: deletedArticle});
    
})