//create HTTP server
//import express module
import exp from "express";
import {userApp} from './APIs/UserAPI.js'
import {productApp} from './APIs/ProductAPI.js'

//create server
const app=exp()
//port number
app.listen(3000,()=>console.log('HTTP server listening on port 3000....'))

//body parsing middleware
app.use(exp.json())

app.use('/user-api',userApp)
app.use('/product-api',productApp)








