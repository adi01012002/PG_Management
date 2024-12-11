// controllers/paymentController.js
import Payment from '../models/paymentModel.js';
import Student from '../models/studentModel.js';
import jwt from "jsonwebtoken";
import dotenv from "dotenv";


export const getPaymentsByStudent = async (req, res) => {
  try {
      const { id } = req.params;
      const userId = req.user.id;
      // console.log(id,userId)
      const payments = await Payment.find({
          id: id,
          createdBy: userId
      }).sort({ date: -1 });
      // console.log(payments)

      res.status(200).json(payments);
  } catch (error) {
      res.status(500).json({ message: "Error fetching payment details", error: error.message });
  }
};

// Add a payment for a specific student
export const addPayment = async (req, res) => {
  try {
    const { id } = req.params;
    // console.log(id)
    const { amount, date, type, description } = req.body;

    const student = await Student.findOne({ _id: id, createdBy: req.user.id });
    if (!student) return res.status(404).json({ message: "Student not found or not authorized" });

    const payment = new Payment({
      id,
      amount,
      date,
      type,
      description,
      createdBy: req.user.id,
    });
    // Populate the 'id' field with the student's name
    // console.log(payment)
    await payment.save();
    res.status(201).json(payment);
  } catch (error) {
    res.status(500).json({ message: "Error adding payment", error: error.message });
  }
};

export const getPaymentsByUser = async (req, res) => {
  try {

    const userId = req.user.id;

    // Fetch all students created by the user
    const students = await Student.find({ createdBy: userId });
    const studentIds = students.map((student) => student.id);
    // Find payments created by the logged-in user
    const payments = await Payment.find({id: { $in: studentIds }, createdBy: req.user.id })
      .populate({
        path: 'id', // assuming `studentId` is the reference field in Payment schema
        select: 'username', // only include the name of the student
      }).sort({ date: -1 });
       



    if (!payments) return res.status(404).json({ message: "No payments found for this user" });

    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching payments", error: error.message });
  }
};