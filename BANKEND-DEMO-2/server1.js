//create HTTP server
//import express module
import exp from 'express'
//create server
const app=exp()
//port number
app.listen(3000,()=>console.log('HTTP server listening on port 3000....'))

//body parsing middleware
app.use(exp.json())


//Create a custom middleware
function middleware1(req,res,next){
    console.log("middleware-1 executed")
    //send res
    //res.json({message:"res from middleware"})
    //forward req to next middleware
    next()
}
function middleware2(req,res,next){
    console.log("middleware-2 executed")
    //send res
    //res.json({message:"res from middleware"})
    //forward req to next middleware
    next()
}

//to execute for every incoming req
app.use(middleware1)
//app.use(middleware2)


//test local in-memory data
let users=[]

app.get('/users',(req,res)=>{
    //send res to client 
    res.status(200).json({"message":"all users",payload:users})
})
//post request handiling route(create users)
app.post('/users', middleware2,(req,res)=>{
    //get user resources from req
    let newuser=req.body
    //console.log("new user",newuser)
    users.push(newuser);
    res.status(201).json({message:"user created"})

})
//put request handiling route(update users)
app.put('/users/id',(req,res)=>{
    //get modified user from req
    let newUser=req.body;
    //find the user with id exists in array
    let userIndex=users.findIndex((ele)=>ele.id===newUser.id)
    //if usr not found , send res as "user not found"
    if (userIndex===-1){
        return res.status(404).json({message:"user not found"})
    }
    //if user found, then modify the user
    users.splice(userIndex,1,newUser)
    //send res as "user modified"
    res.status(200).json({message:"user modified"})


})

//read user by id
//: is considered as url parameter
app.get('/users/:id',(req,res)=>{
    
    console.log(req.params)
    //read id from url parameter
    let userId=Number(req.params.id)  //{ id : 100 }
    //read user by this id
    let user=users.find(userObj=>userObj.id===userId)
    if (!user){
        return res.status(404).json({message:"user not found"})
    }
    //send res
    res.status(200).json({message:"user",payload:user})

})



//delete request handiling route(delete users)

//delete user by id
app.delete('/user/:id',(req,res)=>{
    let userId=Number(req.params.id)
    let userIndex=users.findIndex((ele)=>ele.id===userId)
    if(userIndex===-1){
        return res.status(404).json({message:"user not found"})
    }
    
    let deleteUser=users.splice(userIndex,1)
    res.status(200).json({message:"Deleted successfully"})


})

let products=[]

app.get('/products',(req,res)=>{
    //send res to client 
    res.status(200).json({"message":"all products",payload:products})
})


app.post('/products',(req,res)=>{
    let newproduct=req.body
    products.push(newproduct)
    res.status(201).json({"message":"product added"})
})


app.put('/products',(req,res)=>{
    let newProduct=req.body;
    //find product index
    let productIndex=products.findIndex((ele)=>ele.productId===newProduct.productId)
    //checking if product is there or not
    if (productIndex===-1){
        return res.status(404).json({message:"product not found"})
    }
    //if there it is modified
    products.splice(productIndex,1,newProduct)
    res.status(200).json({message:"product modified"})

})


app.delete('/products/:id',(req,res)=>{
    let deleteProduct=Number(req.params.id);
    let productsIndex=products.findIndex((ele)=>ele.productId===deleteProduct)
    if(productsIndex===-1){
        return res.status(404).json({message:"product not found"})
    }
    products.splice(productsIndex,1)
    res.status(200).json({message:"Deleted Successfully"})
})



app.get('products-id/:id',(req,res))