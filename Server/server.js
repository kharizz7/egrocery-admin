require('dotenv').config(); // Load environment variables

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("./models/User");
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
  .catch(err => console.log("MongoDB connection error", err));

// ✅ Improved Sign-Up Route

app.post("/api/signup", async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;

  if (!username || !email || !password || !confirmPassword) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match!" });
  }

  try {
    // Check if email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered!" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Save the new user
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    // ✅ Generate JWT Token after successful signup
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: "24h" });

    // ✅ Use 'newUser' instead of 'user'
    res.status(201).json({
      message: "User registered successfully",
      token,  // ✅ Now defined
      username: newUser.username,
      email: newUser.email
    });

  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


// ✅ Improved Sign-In Route with JWT
app.post("/api/signin", async (req, res) => {
  const { email, password } = req.body;

  if (!email || typeof password !== "string" || password.trim() === "") {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password.trim(), user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({
      message: "User signed in successfully",
      token,
      username: user.username,  // ✅ Now included
      email: user.email         // ✅ Now included
    });

  } catch (error) {
    console.error("Sign-in Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});




// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
