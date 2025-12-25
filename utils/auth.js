const jwt = require("jsonwebtoken")

const config = require("./config")
const result = require("./result")


function authUser(req,res,next){
    const allAllowedUrls = ["/user/signup" , "/user/signin"]
    if(allAllowedUrls.includes(req.url))
        next()
    else{
        const token = req.headers.token
        if(!token)
            res.send(result.createResult("Token is missing"))
        else{
            try{
                const payload = jwt.verify(token,config.secret)
                // req.header.payload = payload
                req.headers.email = payload.email
              return next()
            }catch(ex){
               return res.send(result.createResult("Token is Invalid"))
            }
        }
    }
}