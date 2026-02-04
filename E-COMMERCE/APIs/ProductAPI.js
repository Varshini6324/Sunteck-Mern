import exp from 'express'
import {ProductModel} from '../Models/ProductModel.js'

export const productApp=exp.Router()

productApp.get('/products',async(req,res)=>{
    //read product from db
    let products= await ProductModel.find()
    res.status(200).json({message:"Products",payload:products})
})

//create product
productApp.post('/products',async(req,res)=>{
   
    let newProduct=req.body;
    //create new product doc
    let newProductDoc=new ProductModel(newProduct)
    //save in db
    await newProductDoc.save()
    //send res
    res.status(201).json({message:"product created"})
})