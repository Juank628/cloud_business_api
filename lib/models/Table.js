const mongoose = require("mongoose");
const TableSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  location: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Location",
    required: true
  },
  area: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Area",
    required: true
  },
  chairs: {
    type: Number
  },
  enabled: {
    type: Boolean,
    default: true,
    required: true
  }
});
module.exports = mongoose.model("Table", TableSchema);
