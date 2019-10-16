const mongoose = require('mongoose')
const LocationSchema = new mongoose.Schema({

  name: String,
  address: String

})
module.exports = mongoose.model('Location', LocationSchema)