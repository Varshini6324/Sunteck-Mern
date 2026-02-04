import {Schema,model} from 'mongoose'

//product schema
const productSchema=new Schema({
    productName:{
        type:String,
        required:[true,"Product name is needed"]
    },
    price:{
        type:Number,
        required:[true,"product price is needed"]
    },
    brand:{
        type:String,
        required:[true,"Brand name is nedded"]
    }
},{
    strict:"throws",
    timestamps:true,
    version:false
})


export const ProductModel=model("product",productSchema)