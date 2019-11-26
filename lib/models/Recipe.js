const mongoose = require("mongoose");

schemaOptions = { toJSON: { virtuals: true } };

const RecipeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    supplies: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Supply" }],
      required: true
    },
    //required supplies quantities
    req_supp_quantities: {
      type: [Number],
      required: true
    },
    //required supplies meassure units
    req_supp_units: {
      type: [String],
      required: true
    },
    //required supplies factor to convert in base units
    req_supp_factors: {
      type: [Number],
      required: true
    },
    price: {
      type: Number,
      required: true 
    },
    //type of recipe (premaked or instant)
    type: {
      type: String,
      required: true
    },
    family: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Recipe_Family",
      required: true
    },
  },
  schemaOptions
);

/*total supplies cost*/
RecipeSchema.virtual("virtuals").get(function() {
  const suppliesCost = this.supplies.reduce(
    (acc, supply, index) =>
      acc +
      (supply.cost / (supply.size * supply.factor)) *
        this.req_supp_quantities[index] *
        this.req_supp_factors[index],
    0
  );
  const profit = this.price - suppliesCost
  return {
    suppliesCost: suppliesCost.toFixed(2),
    profit: profit.toFixed(2)
  }
});

module.exports = mongoose.model("Recipe", RecipeSchema);
