import exp from 'express'
import {userApp} from './APIs/UserAPI.js'
import {productApp} from './APIs/ProductAPI.js'
import {connect} from 'mongoose'
import cookieParser from 'cookie-parser'
const app=exp()
const port=4000
//body parser middleware
app.use(exp.json())
//add cookieparse middleware
app.use(cookieParser())
//connect to db server
async function connectDB(){
    try{
    await connect('mongodb://localhost:27017/anuragdb2')
    console.log("DB connection success")
    //Assign port
    app.listen(port,()=>console.log("server listening to port 4000..."))
    }catch(err){
        console.log("Err in DB connection:",err)
    }
}

connectDB()
//if path starts with user-api forward req to userapi
app.use('/user-api',userApp)
app.use('/product-api',productApp)

//error handling middleware
//function errorHandler(err,req,res,next){
   // res.json({message:"error",reason:err.message})
//}
app.use((err,req,res,next)=>{
    res.status(500).json({message:"error",reason:err.message})
})