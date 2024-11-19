import mongoose from "mongoose";
import Payment from "./paymentModel.js"; // Import Payment model
import bcrypt from "bcrypt";
// const studentSchema = new mongoose.Schema({
//     name: { type: String, required: true },
//     age: { type: Number, required: true },
//     address: { type: String, required: true },
//     phoneNumber: { type: String, required: true },
//     year: { type: String, required: true },
//     createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
// });

// Define the Student schema
const studentSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    pgId: { type: mongoose.Schema.Types.ObjectId, ref: "PG", required: true }, 
    username: { type: String, required: true },
    age: { type: Number, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    year: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
  },
  {
    timestamps: true,
  }
);

studentSchema.pre("remove", async function (next) {
  // Delete associated payments before removing the student
  await Payment.deleteMany({ id: this._id });
  next();
});

// studentSchema.methods.matchPassword = async function (enteredPassword) {
//     return await bcrypt.compare(enteredPassword, this.password);
//   };

studentSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  });
  
  studentSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  };

const Student = mongoose.model("Student", studentSchema);

export default Student;
