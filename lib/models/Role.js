const mongoose = require('mongoose')
const RoleSchema = new mongoose.Schema({

  roleName: String,

})
module.exports = mongoose.model('Role', RoleSchema)