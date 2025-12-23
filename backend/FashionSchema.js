const mongoose = require("mongoose");

const FashionSchema = new mongoose.Schema({
  productCategory: String,
  productName: { type: String, required: true },
  unitsSold: Number,
  returns: Number,
  revenue: Number,
  customerRating: Number,
  stockLevel: Number,
  season: String,
  trendScore: Number
});

module.exports = mongoose.model(
  "FashionModel",
  FashionSchema,
  "FashionShopData"
);
