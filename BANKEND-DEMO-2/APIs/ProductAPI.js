import exp from 'express'
export const productApp=exp.Router()



let products=[]

productApp.get('/products',(req,res)=>{
    //send res to client 
    res.status(200).json({"message":"all products",payload:products})
})


productApp.post('/products',(req,res)=>{
    let newproduct=req.body
    products.push(newproduct)
    res.status(201).json({"message":"product added"})
})


productApp.put('/products',(req,res)=>{
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


productApp.delete('/products/:id',(req,res)=>{
    let deleteProduct=Number(req.params.id);
    let productsIndex=products.findIndex((ele)=>ele.productId===deleteProduct)
    if(productsIndex===-1){
        return res.status(404).json({message:"product not found"})
    }
    products.splice(productsIndex,1)
    res.status(200).json({message:"Deleted Successfully"})
})



