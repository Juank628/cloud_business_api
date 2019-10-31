const jwt = require("jsonwebtoken");

function validateRole(req,res,next){
    const idToken = req.headers.authorization;
    let decodedJwt = jwt.decode(idToken, { complete: true });
    let role = decodedJwt.payload['custom:role']
    if(role === "administrator"){
        next()
    } else {
        res.status(401).json({
            error: "Acceso denegado"
        })
    }
}

module.exports = validateRole