import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/userModel.js";
dotenv.config();

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  // console.log(token);
  if (!token) return res.status(401).json({ message: "Access Denied" });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    // console.log("Decoded token:", verified);
    req.user = verified;
    next();
  } catch (error) {
    console.error("Token verification error:", error.message); // Logging the error for debugging
    res.status(400).json({ message: "Invalid Token" });
  }
};


// const authMiddleware = (req, res, next) => {
//     const authHeader = req.headers.authorization;
//     const token = authHeader && authHeader.split(" ")[1];
    
//     if (!token) return res.status(401).json({ message: "Access Denied" });
  
//     try {
//       // Decode token using the secret key and set the user in the request
//       const verified = jwt.verify(token, process.env.JWT_SECRET);
//       req.user = verified; // Assuming the token payload contains the user info with `_id`
//       next();
//     } catch (error) {
//       console.error("Token verification error:", error.message);
//       res.status(400).json({ message: "Invalid Token" });
//     }
//   };
export default authMiddleware;

export const protect = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Not authorized, no token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);
    // console.log(user)

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user; // Attach the user object to the request
    next();
  } catch (error) {
    res.status(401).json({ message: "Not authorized, token failed" });
  }
};