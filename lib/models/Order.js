const mongoose = require("mongoose");

schemaOptions = { toJSON: { virtuals: true } };

const OrderSchema = new mongoose.Schema(
  {
    //optional. ex: customer's name
    name: {
      type: String
    },
    recipes: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Recipe" }],
      required: true
    },
    //required recipes quantities
    req_recipes_quantities: {
      type: [Number],
      required: true
    },
    user: {
      type: String,
      required: true
    },
    location: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Location",
      required: true
    },
    //table is not required because the order can be a delivery
    table: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Table",
      required: false
    },
    cost: {
      type: Number,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    profit: {
      type: Number,
      required: true
    }
  },
  schemaOptions
);

module.exports = mongoose.model("Order", OrderSchema);
