

// //ahsbsg@gmail.com
// // aditya0101

import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

// Function to generate JWT
const generateToken = (id,role) => {
  try {
    return jwt.sign({ id,role }, process.env.JWT_SECRET, { expiresIn: "30d" });
  } catch (error) {
    throw new Error("Error generating token");
  }
};

// Register User
export const registerUser = async (req, res) => {
  try {
    // const { username, email, password } = req.body;
    const { username, email, password, role } = req.body;

    // Validate fields
    if (!username || !email || !password ||!role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Create a new user
    // const newUser = new User({ username, email, password });
    // Create user
    const newUser = new User({
      username,
      email,
      password,
      role,
    });

    // Save user to the database
    await newUser.save();

    // Respond with user data and token
    res.status(201).json({
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      role,
      token: generateToken(newUser._id),
    });
  } catch (error) {
    if (error.code === 11000) {
      // Duplicate key error (e.g., unique email constraint)
      return res.status(400).json({ message: "Duplicate username or email" });
    }
    console.error("Error during registration:", error);
    res
      .status(500)
      .json({ message: "Error registering user", error: error.message });
  }
};

// Login User
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate fields
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Check if the password matches
    const isPasswordValid = await user.matchPassword(password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Respond with user data and token
    res.json({
      _id: user._id,
      username: user.username,
      role:user.role,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
};
