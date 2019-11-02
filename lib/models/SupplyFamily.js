const mongoose = require("mongoose");
const SupplyFamilySchema = new mongoose.Schema({
  name: String
});
module.exports = mongoose.model("Supply_Family", SupplyFamilySchema);