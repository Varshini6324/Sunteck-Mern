import jwt from 'jsonwebtoken'


export function verifyToken(req,res,next){
    //token verification test

    //1.Get token from req(using cookie)
        let signedToken=req.cookies.token//{token:""}
        if(!signedToken){
            return res.status(401).json({message:"Please Login First"})
        }
    //2.Verify token
        let decodedToken=jwt.verify(signedToken,'abcdef')
        console.log(decodedToken)
        next()
}