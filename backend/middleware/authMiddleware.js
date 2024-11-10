import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/userModel.js";
dotenv.config();

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  console.log(token);
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





















// import jwt from "jsonwebtoken";
// import dotenv from "dotenv";
// import User from "../models/userModel.js";
// dotenv.config();

// const authMiddleware = (req, res, next) => {
//   const token = req.headers.authorization;
//   console.log(token);
//   if (!token) return res.status(401).json({ message: "Access Denied" });

//   try {
//     const verified = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = verified;
//     next();
//   } catch (error) {
//     res.status(400).json({ message: "Invalid Token" });
//   }
// };

// export default authMiddleware;
