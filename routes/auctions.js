const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const AuctionItem = require("../models/AuctionItem");
const router = express.Router();

// Ensure the uploads directory exists
const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// Create a new auction item
router.post("/create", upload.array("images", 5), async (req, res) => {
  try {
    const { title, description, startingPrice, auctionEndTime, category, serialNumber, model, yearOfManufacture, color, primaryDamage, secondaryDamage, VIN, odometer, working } = req.body;
    const images = req.files ? req.files.map((file) => file.path) : [];

    const newAuctionItem = new AuctionItem({
      title,
      description,
      startingPrice,
      auctionEndTime,
      category,
      serialNumber: serialNumber || "N/A",  // Default to "N/A" if serialNumber is not provided
      model: model || "N/A",  // Default to "N/A" if model is not provided
      yearOfManufacture: yearOfManufacture || "N/A",  // Default to "N/A" if yearOfManufacture is not provided
      color: color || "N/A",  // Default to "N/A" if color is not provided
      primaryDamage: primaryDamage || "N/A",  // Default to "N/A" if primaryDamage is not provided
      secondaryDamage: secondaryDamage || "N/A",  // Default to "N/A" if secondaryDamage is not provided
      VIN: VIN || "N/A",  // Default to "N/A" if VIN is not provided
      odometer: odometer || 0,  // Default to 0 if odometer is not provided
      working: working || true,  // Default to true if working is not provided
      images,
    });

    await newAuctionItem.save();
    res.status(201).json({ message: "Auction item created successfully", item: newAuctionItem });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Fetch all auction items
router.get("/", async (req, res) => {
  try {
    const auctionItems = await AuctionItem.find().sort({ auctionEndTime: 1 });
    res.status(200).json(auctionItems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete an auction item
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await AuctionItem.findByIdAndDelete(id);
    res.status(200).json({ message: "Auction item deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
// This code defines an Express router for managing auction items.