import {Schema,model} from 'mongoose'

//Create productSchema (pid,productName,price)
const productSchema=new Schema({
    pid:{
        type:Number,
        required:[true,"pid is required"],
        maxLength:[3,"Max Length is exceeded"]
    },
    productName:{
        type:String,
        required:[true,"product name is required"],
        minLength:[4,"Min Length should be 4"],
        maxLength:[6,"Max Length exceeded"]
    },
    price:{
        type:Number,
        required:[true,"Price is required"]
    }
},{
    strict:"throw",
    timestamps:true
})

//exporting the ProductModel
export const ProductModel=model("product",productSchema)