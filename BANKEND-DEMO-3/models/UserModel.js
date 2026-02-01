import {Schema,model} from 'mongoose'

//Create User Schema(username.password,age)
const userSchema=new Schema({
    username:{
        type:String,
        required:[true,"Username is required"],
        minLength:[4,"Min Length should be 4"],
        maxLength:[6,"Max Length exceeded"]
    },
    password:{
        type:String,
        required:[true,"Password is required"]
    },
    age:{
        type:Number,
        required:[true,"Age is required"],
        min:[18,"Age should be above 18"],
        max:[25,"Age should be less than 25"]
    },
 },{ strict:"throw",
    timestamps:true
})


//Crete User Model with that Schema
export const UserModel=model("user",userSchema)