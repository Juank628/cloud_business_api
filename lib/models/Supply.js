const mongoose = require("mongoose");
const SupplySchema = new mongoose.Schema({
  description: {
    type: String,
    required: true
  },
  family: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Supply_Family',
    required: true
  },
  cost: {
    type: Number,
    required: true
  }
});
module.exports = mongoose.model("Supply", SupplySchema);
