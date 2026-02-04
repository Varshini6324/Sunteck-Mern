import exp from 'express'
import { UserModel } from '../Models/UserModel.js'
import {hash} from 'bcryptjs'
import { ProductModel } from '../Models/ProductModel.js'
export const userApp=exp.Router()

//Create User
userApp.post('/users',async(req,res)=>{
    //get user from req
    let newUser=req.body;
 
    await new UserModel(newUser).validate()
    
    //hashed password
    let hashedPassword=await hash(newUser.password,12)
    //replace plain password with hashed password
    newUser.password=hashedPassword
    //create new user document
    let newUserDoc=new UserModel(newUser)
    //save
    await newUserDoc.save({validateBeforeSave:false})
    //res
    res.status(201).json({message:"User created"})
})


//Add product to user's cart
/*userApp.put('/user-cart/user-id/:uid/product-id/:pid',async(req,res)=>{
    //read uid and pid from url parameters
    let {uid,pid}=req.params;//{ uid:" ",pid:" " }
    //check user
    let user=await UserModel.findById(uid)
    if(!uid){
        return res.status(401).json({message:"User not found"})
    }
    //check product
    let product=await ProductModel.findById(pid)
    if(!pid){
        return res.status(401).json({message:"Product not found"})
    }
    //perform update
    let modifiedUser=await UserModel.findByIdAndUpdate(
        uid,
        {$push:{"cart":{product:pid}}},
        {new:true}).populate("cart.product")
    //send res
    res.status(200).json({message:"Product is added",payload:modifiedUser})
})
*/
userApp.put('/user-cart/user-id/:uid/product-id/:pid',async(req,res)=>{
    //read url parameters
    let {uid,pid}=req.params
    //check user
    let user=await UserModel.findById(uid)
    if(!uid){
        return res.status(401).json({message:"User not found"})
    }
    //check product
    let product=await ProductModel.findById(pid)
    if(!pid){
        return res.status(401).json({message:"Product not found"})
    }
    //if product already in cart increament
    //check if product exists or not
    let modifiedUser = user.cart.find(ele=>ele.product == pid)
    if(modifiedUser){
        modifiedUser.quantity += 1
    }
    else{
        await UserModel.findByIdAndUpdate(
        uid,
        {$push:{"cart":{product:pid}}},
        {new:true}).populate("cart.product")
    }
    await user.save()
    //res
    res.status(200).json({message:"product added",payload:modifiedUser})
})




//read user by id
//read user
userApp.get('/users/:uid',async(req,res)=>{
    let {uid} = req.params
   //read users from db
    let users= await UserModel.findById(uid).populate("cart.product","name price brand") // to pick the ref of nested references - populate
    //
    res.status(200).json({message:"users",payload:users})
})