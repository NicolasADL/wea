const jwt = require("jsonwebtoken");

function verifySign(req,res,next){
    const token =req.header("auth-token");
    if(!token) return res.status(401).send("no autorizado");
    try {
        const payload = jwt.verify(token, process.env.SECRET_TOKEN);
        req.user = payload;
        next();
        
    } catch (error) {
        return res.status(401).send("no autorizado");
    }
}

module.exports = verifySign;