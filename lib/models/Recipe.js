const mongoose = require("mongoose");

schemaOptions = { toJSON: { virtuals: true } };

const RecipeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    supplies: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Supply" }]
    },
    quantities: {
      type: [Number]
    }
  },
  schemaOptions
);

RecipeSchema.virtual("suppliesCost").get(function() {
  return this.supplies.reduce(
    (acc, supply, index) => acc + supply.cost * this.quantities[index],
    0
  );
});

module.exports = mongoose.model("Recipe", RecipeSchema);
