import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import authRoutes from "./routes/authRoutes.js";
import studentRoutes from "./routes/studentRoutes.js"; 
const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));


// Routes
app.use("/auth", authRoutes);       // Authentication routes
app.use("/students", studentRoutes); // Student routes
// app.get("/", (req, res) => {
//   res.send("Hello World");
// });
app.listen(8090, () => {
  console.log("server is running on 8090");
});

mongoose.connect("mongodb+srv://aditya10462004:Q6DTBofGd9fWHDFh@cluster0.e6ud1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");

const db = mongoose.connection;
db.on("error", (err) => {
  console.log(err);
});

db.on("open", () => {
  console.log("connected to the database");
});

// const PORT = process.env.PORT || 8090;

// mongoose
//   .connect("mongodb+srv://aditya10462004:Q6DTBofGd9fWHDFh@cluster0.e6ud1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
//   .then(() =>
//     app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
//   )
//   .catch((error) => console.log(error.message));





// MONGODB_URL=mongodb+srv://aditya10462004:Q6DTBofGd9fWHDFh@cluster0.e6ud1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

// these are two user of this application
// "_id": "6723f9c97f28c3df6e41d3bc",
// "username": "adi",
// "email": "adi01@gmail.com",
// "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MjNmOWM5N2YyOGMzZGY2ZTQxZDNiYyIsImlhdCI6MTczMDQxMDk1NCwiZXhwIjoxNzMzMDAyOTU0fQ.YxK41nUiWXi-Qinks8FubGRHAhIRe-q7iO432W693QU"


// "_id": "6724df75dfb2ca2b3911b865",
// "username": "rishu01",
// "email": "rishu01@gmail.com",
// "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MjRkZjc1ZGZiMmNhMmIzOTExYjg2NSIsImlhdCI6MTczMDQ2OTc0OSwiZXhwIjoxNzMzMDYxNzQ5fQ.SP-ZLHWFujUsdpb7d2SHnEU-x9Q5GsgnnvYjwN4XaMk"