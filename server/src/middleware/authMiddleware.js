import { verifyToken } from "../utils/token.js";
function isLoggedInAPI(req,res,next){
    const authorization  = req.headers.authorization;
    console.log("authorization",authorization);
    if(!authorization){
        res.status(401).json({error:"You shall not pass"});
    }
    let token = authorization.split(" "); // si no hay bearer espacio fallaria
    token = token.pop();
    const result = verifyToken(token);
    console.log("token verified",result);
    if(result){
        req.user = {
            _id: result._id 
        }
        next();
    }else{
        res.status(401).json({error:"You shall not pass"});
    }
}

export {
    isLoggedInAPI
}