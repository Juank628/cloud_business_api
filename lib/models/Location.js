const mongoose = require('mongoose')
const LocationSchema = new mongoose.Schema({

  name: String,
  address: String,
  tables: [Object]

})
module.exports = mongoose.model('Location', LocationSchema)