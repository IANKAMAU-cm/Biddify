const mongoose = require("mongoose");

const AuctionItemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  startingPrice: { type: Number, required: true },
  images: [{ type: String }], // Array to store image URLs
  auctionEndTime: { type: Date, required: true },
  category: { type: String, enum: ["electronics", "furniture", "vehicles", "real estate", "machinery", "featured"], required: true },
  serialNumber: { type: String, default: "N/A" },
  model: { type: String, default: "N/A" },
  yearOfManufacture: { type: String, default: "N/A" },
  color: { type: String, default: "N/A" },
  primaryDamage: { type: String, default: "N/A" },
  secondaryDamage: { type: String, default: "N/A" },
  VIN: { type: String, default: "N/A" },
  odometer: { type: Number, default: 0 },
  working: { type: Boolean, default: true },
  bids: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      amount: { type: Number, required: true },
      timestamp: { type: Date, default: Date.now },
    },
  ],
}, { timestamps: true });

module.exports = mongoose.model("AuctionItem", AuctionItemSchema);
// This code defines a Mongoose schema for an auction item in a MongoDB database.