import exp from "express"
import {connect} from "mongoose"
import {productApp} from "./APIs/ProductAPI.js"
import {userApp} from "./APIs/UserAPI.js"

const app=exp()
const port =4000
//body parser middleware
app.use(exp.json())
//database connect 
async function connectDB(){
    try{
    await connect('mongodb://localhost:27017/anuragdb3')
    console.log("DB connection success")
    //Assign port
    app.listen(port,()=>console.log("server listening to port 4000..."))
    }catch(err){
        console.log("Err in DB connection:",err)
    }
}

connectDB()

app.use(exp.json())
app.use('/user-api',userApp)
app.use('/product-api',productApp)

function errorHandler(err,req,res,next)
{res.json({message:"error",reason:err.message}
    
)}
app.use(errorHandler)