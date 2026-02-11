import exp from 'express'
import {connect} from 'mongoose'
import {config} from 'dotenv'
import {adminRoute} from './APIs/AdminAPI.js'
import {authorRoute} from './APIs/AuthorAPI.js'
import {userRoute} from './APIs/UserAPI.js'
import cookieParser from 'cookie-parser'
import { commonRoute } from './APIs/CommonAPI.js'
config()//process.env
const app=exp()
//add body parser middleware
app.use(exp.json())
//
app.use(cookieParser())
//connect APIs
app.use('/user-api',userRoute)
app.use('/admin-api',adminRoute)
app.use('/author-api',authorRoute)
app.use('/common-api',commonRoute)

//connect to db
const connectDB=async()=>{
    try{
    await connect(process.env.DB_URL)
    console.log("DB connection success")
    app.listen(process.env.PORT,()=>console.log("server started"))
    }catch(err){
        console.log("Error",err)
    }
}
connectDB()


//deal with invalid path
app.use((req,res,next)=>{
    res.json({message:`${req.url} is invalid path`})
})

//error handling middleware
app.use((err,req,res,next)=>{
    console.log("Error",err)
    res.json({message:"error",reason:err.message})
})