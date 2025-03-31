const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const router = express.Router();

// Register a new user
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Validate input
    if (!name || !email || !password || !role) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    console.log("Raw password:", password);
    console.log("Hashed password:", hashedPassword);

    // Create new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role, // "admin" or "user"
    });

    console.log("Saving user to database:", newUser); // Debugging log
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Error during registration:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.log("User not found:", email); // Debugging log
      return res.status(404).json({ error: "User not found" });
    }

    console.log("Raw password:", password); // Debugging log
    console.log("Hashed password:", user.password); // Debugging log

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Password match:", isMatch); // Debugging log

    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.status(200).json({ token, role: user.role });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//logout
router.post("/logout", (req, res) => {
  res.status(200).json({ message: "Logged out successfully" });
});


module.exports = router;
// This code defines an Express router for user authentication. 