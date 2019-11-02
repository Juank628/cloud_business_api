//validateToken required before this middleware
//userData cames from previous validateToken middleware

function validateRole(accessRole) {
  return function(req, res, next) {
    let userRole = req.userData["custom:role"];
    let validRoles = [];

    if (accessRole === "system_administrator")
      validRoles = ["system_administrator"];

    if (accessRole === "business_administrator")
      validRoles = ["system_administrator", "business_administrator"];

    if (accessRole === "supervisor")
      validRoles = [
        "system_administrator",
        "business_administrator",
        "supervisor"
      ];

    if (accessRole === "waiter")
      validRoles = [
        "system_administrator",
        "business_administrator",
        "supervisor",
        "waiter"
      ];

    if (validRoles.includes(userRole)) {
      next();
    } else {
      res.status(401).json({
        error: `Acceso denegado. Seccion restringida sólo para el rol: ${accessRole}`
      });
    }
  };
}

module.exports = validateRole;
