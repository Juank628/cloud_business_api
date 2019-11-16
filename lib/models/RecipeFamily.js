const mongoose = require("mongoose");
const RecipeFamilySchema = new mongoose.Schema({
  name: String
});
module.exports = mongoose.model("Recipe_Family", RecipeFamilySchema);