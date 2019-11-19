/**
 * warehouses presents in all locations
 */

const mongoose = require("mongoose");
const WarehouseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  enabled: {
    type: Boolean,
    default: true,
    required: true
  }
});
module.exports = mongoose.model("Warehouse", WarehouseSchema);
