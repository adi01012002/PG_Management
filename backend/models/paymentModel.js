// models/paymentModel.js
import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  type: {
    type: String,
    enum: ["cash", "card", "online", "paytm", "check", "other"],
    required: true,
  },
  description: {
    type: String,
    default: "",
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const payment = mongoose.model("Payment", paymentSchema);
export default payment;
