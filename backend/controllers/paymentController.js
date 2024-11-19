// controllers/paymentController.js
import Payment from '../models/paymentModel.js';
import Student from '../models/studentModel.js';
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
// // Get all payments for a specific student
// export const getPaymentsByStudent = async (req, res) => {
//   try {
//     const { studentId } = req.params;
//     const payments = await Payment.find({ studentId }).sort({ date: -1 });
//     res.status(200).json(payments);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching payment details", error: error.message });
//   }
// };


// Get all payments for a specific student created by the logged-in user
// export const getPaymentsByStudent = async (req, res) => {
//   try {
//     const { studentId } = req.params; // Student ID from the URL
//     const token = req.headers.authorization.split(' ')[1]; // Get the token from Authorization header

//     // // Verify the token and extract the user ID
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const userId = decoded.id; // Assuming the token contains the userId

//     // Fetch payments where studentId and createdBy match the logged-in user
//     const payments = await Payment.find({ 
//       studentId,
//       createdBy: userId, // Filter by the logged-in user
//     }).sort({ date: -1 }); // Sort by date in descending order

//     res.status(200).json(payments);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching payment details", error: error.message });
//   }
// };


// export const getPaymentsByStudent = async (req, res) => {
//   const { studentId, createdBy } = req.query;
//   // Fetch payments based on studentId or createdBy (if provided)
//   Payment.find({
//     $or: [
//       { 'student.id': studentId },  // Payments linked to the specific student
//       { createdBy: createdBy },      // Payments made by the logged-in user
//     ]
//   }).exec((err, payments) => {
//     if (err) {
//       return res.status(500).json({ error: 'Error fetching payments' });
//     }
//     return res.json(payments);
//   });
// }


// export const getPaymentsByStudent = async (req, res) => {
//   try {
//     const { studentId, createdBy } = req.query;
    
//     // Fetch payments based on studentId or createdBy (if provided)
//     const payments = await Payment.find({
//       $or: [
//         { 'student.id': studentId },  // Payments linked to the specific student
//         { createdBy: createdBy },      // Payments made by the logged-in user
//       ]
//     }).exec();  // This now returns a promise, so we await it.

//     // Return payments as response
//     return res.json(payments);
//   }
//   catch(err){
//     console.log(err)
//   }
// }// If there's an error, return

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
       
 // Fetch payments only for existing students
//  console.log(studentIds,id)
//  const payments = await Payment.find({ id: { $in: studentIds }, createdBy: userId })
//  .populate({
//       path: 'id', // assuming `studentId` is the reference field in Payment schema
//       select: 'name', // only include the name of the student
//     }).sort({ date: -1 });



    if (!payments) return res.status(404).json({ message: "No payments found for this user" });

    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching payments", error: error.message });
  }
};