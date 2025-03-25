require('dotenv').config(); // Load environment variables

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("./models/User");
const Stock = require("./models/Stock"); // Ensure you have the Stock model
const authRoutes = require("./routes/Auth");

const app = express();
const PORT = process.env.PORT || 3000;

// Ensure required environment variables exist
if (!process.env.MONGODB_URI || !process.env.JWT_SECRET) {
  console.error("Missing required environment variables");
  process.exit(1);
}

// CORS configuration
app.use(cors({
  origin: "*", // Allow all origins
  credentials: true, // Allow credentials (cookies, authorization headers)
}));

// Middleware to parse JSON
app.use(express.json());
app.use("/auth", authRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

// ✅ Authentication Middleware
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  console.log("Received Token:", token); // ✅ Add this line

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach decoded info to the request
    next();
  } catch (error) {
    console.error("Token verification error:", error.message);
    res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};



// ✅ Sign-Up Route
app.post("/api/signup", async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;

  if (!username || !email || !password || !confirmPassword) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match!" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: "24h" });

    res.status(201).json({
      message: "User registered successfully",
      token,
      username: newUser.username,
      email: newUser.email
    });

  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// ✅ Sign-In Route
app.post("/api/signin", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "24h" });

    res.status(200).json({
      message: "User signed in successfully",
      token,
      username: user.username,
      email: user.email
    });

  } catch (error) {
    console.error("Sign-in Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Get Signed-In User Details (Protected Route)
app.get("/api/user", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password"); // Exclude password
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user details:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Add New Stock (Protected Route)
app.post("/api/stocks", verifyToken, async (req, res) => {
  const { name, category, quantity, price } = req.body;

  if (!name || !category || !quantity || !price) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newStock = new Stock({ name, category, quantity, price });
    await newStock.save();

    res.status(201).json({
      message: "Stock added successfully",
      stock: newStock
    });

  } catch (error) {
    console.error("Error adding stock:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Get All Stocks (Protected Route)
app.get("/api/stocks", verifyToken, async (req, res) => {
  try {
    const stocks = await Stock.find({});
    res.status(200).json(stocks);
  } catch (error) {
    console.error("Error fetching stocks:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
