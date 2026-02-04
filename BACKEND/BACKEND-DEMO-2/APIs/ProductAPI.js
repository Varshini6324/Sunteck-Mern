import exp from 'express'
import {ProductModel} from '../models/ProductModel.js'
export const productApp=exp.Router()

//Product API


productApp.get('/products',async(req,res)=>{
    //read users from db
    let products=await ProductModel.find()
    //send res
    res.status(200).json({message:"products",payload:products})
})

//Create user
productApp.post('/products',async(req,res)=>{
    //get new product from req
    let newProduct=req.body
    //Create Product Document
    let newProductDoc=new ProductModel(newProduct)
    //save in db
    await newProductDoc.save()
    //send res
    res.status(201).json({message:"product created",payload:newProductDoc})

})


//get product by id
productApp.get('/products/:id',async(req,res)=>{
    //get object id from params
    let objId=req.params.id
    //find product in db
    let productObj=await ProductModel.findById(objId)
    //send res
    res.status(200).json({message:"products",payload:productObj})
})


//update product by id
productApp.put('/products/:id',async(req,res)=>{
    //get object id from params
    let objId=req.params.id
    //get modified product from req
    let modifiedProduct=req.body
    //find product by id and update it
    let latestProduct= await ProductModel.findByIdAndUpdate(objId,{$set:{...modifiedProduct}},{new:true,runValidators:true})
    //send res
    res.status(200).json({message:"modified product",payload:latestProduct})
})