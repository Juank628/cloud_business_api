//validateToken required before this middleware
//userData cames from previous validateToken middleware

function validateSystemAdminRole(req,res,next){
    let role = req.userData['custom:role']
    if(role === "system_administrator"){
        next()
    } else {
        res.status(401).json({
            error: "Acceso denegado: seccion restringida sólo para administradores del sistema"
        })
    }
}

module.exports = validateSystemAdminRole