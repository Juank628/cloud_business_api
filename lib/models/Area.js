/**
 * physical area where the tables are located
 */

const mongoose = require("mongoose");
const AreaSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  location: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Location",
    required: true
  },
  enabled: {
    type: Boolean,
    default: true,
    required: true
  }
});
module.exports = mongoose.model("Area", AreaSchema);
