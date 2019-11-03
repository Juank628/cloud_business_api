const mongoose = require("mongoose");
const SupplySchema = new mongoose.Schema({
  active: {
    type: Boolean,
    required: true,
  },
  barCode: {
    type: String,
    required: false
  },
  description: {
    type: String,
    required: true
  },
  family: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Supply_Family',
    required: true
  },
  size: {
    type: Number,
    required: true
  },
  units: {
    type: String,
    required: true
  },
  factor: {
    type: Number,
    required: true
  },
  cost: {
    type: Number,
    required: true
  }
});
module.exports = mongoose.model("Supply", SupplySchema);
