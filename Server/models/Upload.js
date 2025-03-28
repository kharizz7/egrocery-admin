const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  brand: String,
  price: Number,
  quantity: Number,
  offer: String,
  availability: String,
  category: String,
});

module.exports = mongoose.model("Product", productSchema);
