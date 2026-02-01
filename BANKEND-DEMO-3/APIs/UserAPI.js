import exp from 'express'
import {UserModel} from '../models/UserModel.js'
export const userApp=exp.Router()


//USER API

//CREATE USER
userApp.post('/users',async(req,res)=>{
    //get new user from req
    let newUser=req.body
    //Create new user document
    let newUserDoc=new UserModel(newUser)
    //save in db
    await newUserDoc.save()
    //send res
    res.status(201).json({message:"user created"})
})



//Read User
userApp.get('/users',async(req,res)=>{
    //read users from DB
    let users=await UserModel.find()
    //send res
    res.status(200).json({message:"users",payload:users})
})

//Read user by id
userApp.get('/users/:id',async(req,res)=>{
    //get ObjectId from Url
    let objId=req.params.id
    //find user in DB
    let userObj=await UserModel.findById(objId)
    //send res
    res.status(200).json({message:"users",payload:userObj})

})


//Update User
userApp.put("/users/:id",async(req,res)=>{
    //get objectId from url
    let objId=req.params.id
    //get modified user from req
    let modifiedUser=req.body
    //make update
    let latestUser=await UserModel.findByIdAndUpdate(objId,{$set:{...modifiedUser}},{new:true,runValidators:true})
    //send res
    res.status(200).json({message:"user modified",payload:latestUser})
})


//Delete User
userApp.delete('/users/:id',async(req,res)=>{
    //get object from url params
    let objId=req.params.id
    //delete user by id
    let deletedUser=await UserModel.findByIdAndDelete(objId)
    res.status(200).json({message:"user removed",payload:deletedUser})
})