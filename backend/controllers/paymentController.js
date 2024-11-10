// controllers/paymentController.js
import Payment from '../models/paymentModel.js';
import Student from '../models/studentModel.js';

// Get all payments for a specific student
export const getPaymentsByStudent = async (req, res) => {
  try {
    const { studentId } = req.params;
    const payments = await Payment.find({ studentId }).sort({ date: -1 });
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
    // console.log(payment)
    await payment.save();
    res.status(201).json(payment);
  } catch (error) {
    res.status(500).json({ message: "Error adding payment", error: error.message });
  }
};