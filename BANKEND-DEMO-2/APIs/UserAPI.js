import exp from 'express'
export const userApp=exp.Router()

let users=[]

userApp.get('/users',(req,res)=>{
    //send res to client 
    res.status(200).json({"message":"all users",payload:users})
})
//post request handiling route(create users)
userApp.post('/users',(req,res)=>{
    //get user resources from req
    let newuser=req.body
    //console.log("new user",newuser)
    users.push(newuser);
    res.status(201).json({message:"user created"})

})
//put request handiling route(update users)
userApp.put('/users/id',(req,res)=>{
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
userApp.get('/users/:id',(req,res)=>{
    
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
userApp.delete('/user/:id',(req,res)=>{
    let userId=Number(req.params.id)
    let userIndex=users.findIndex((ele)=>ele.id===userId)
    if(userIndex===-1){
        return res.status(404).json({message:"user not found"})
    }
    
    let deleteUser=users.splice(userIndex,1)
    res.status(200).json({message:"Deleted successfully"})


})