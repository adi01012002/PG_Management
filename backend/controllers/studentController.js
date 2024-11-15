// import Student from '../models/studentModel.js';
// import { studentValidationSchema } from '../validations/studentValidation.js';

// export const addStudent = async (req, res) => {
//     const { error } = studentValidationSchema.validate(req.body);
//     if (error) return res.status(400).json({ message: error.details[0].message });

//     try {
//         console.log(req.user._id)
//         const newStudent = new Student({
//             ...req.body,
//             createdBy: req.user._id
//         });

//         await newStudent.save();
//         res.status(201).json({ message: 'Student added successfully', student: newStudent });
//     } catch (err) {
//         res.status(500).json({ message: 'Failed to add student', error: err.message });
//     }
// };

// // export default addStudent ;

import Student from "../models/studentModel.js";
import PG from "../models/PgModel.js";
// import Payment from '../models/paymentModel.js'; // Import your Payment model
// add student
export const addStudent = async (req, res) => {
  try {
    // `req.user` is set by your auth middleware and contains the user ID
    const userId = req.user.id;
    // console.log(userId)
    // Create a new student with `createdBy` set to the user’s ID
    const student = new Student({
      ...req.body,
      createdBy: userId,
    });
    // Save the student to the database
    await student.save();

    // Work Related to Pg Status

    // Fetch the PG data associated with the logged-in user
    const pg = await PG.findOne({ owner: userId });
    console.log(pg);

    if (!pg) {
      return res.status(404).json({ message: "PG not found" });
    }

    // Check if there's space available (based on beds or rooms)
    if (pg.availableBeds <= 0 || pg.availableRooms <= 0) {
      return res
        .status(400)
        .json({ message: "No available beds or rooms in your PG" });
    }

    // Update the PG data
    // console.log(student._id);
    console.log(student.id);
    pg.students.push(student._id);
    pg.availableBeds -= 1;
    pg.availableRooms -= 1;

    // Save the updated PG to the database
    await pg.save();

    res.status(201).json({ message: "Student created successfully", student });
  } catch (error) {
    res.status(500).json({ message: "Error creating student", error });
  }
};

export const getAllStudents = async (req, res) => {
  try {
    const userId = req.user.id; // User ID from the authenticated request
    //   console.log(userId)

    const students = await Student.find({ createdBy: userId }); // Find students linked to the owner
    //   console.log(students)
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: "Error fetching students", error });
  }
};

// Delete the student
export const deleteStudent = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    // Find the student by ID and ensure it belongs to the authenticated user
    //   console.log(req.user._id)
    const student = await Student.findOne({ _id: id, createdBy: req.user.id });
    //   console.log(student)
    if (!student) {
      return res
        .status(404)
        .json({ message: "Student not found or not authorized to delete" });
    }




    /////////////////////////////////////////////////////
    // Delete payments associated with the student
    // await Payment.deleteMany({ studentId: id });

    /////////////////////////////////////////////////////
    //   await student.remove();
    await student.deleteOne(); // Use deleteOne instead of remove


    // Work Related Pg Status
    // Fetch the PG data associated with the user
    const pg = await PG.findOne({ owner: req.user.id });
    console.log(pg);

    if (!pg) {
      return res.status(404).json({ message: "PG not found" });
    }

    // Remove the student from the PG's student list
    pg.students.pull(student._id);
    pg.availableBeds += 1;
    pg.availableRooms += 1;

    await pg.save();

    res.status(200).json({ message: "Student deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting student", error: error.message });
    console.log(error);
  }
};

// Update student details
export const updateStudent = async (req, res) => {
  const { id } = req.params; // Get student ID from URL parameters
  const { name, age, address, phoneNumber, year } = req.body; // Get the updated data

  try {
    const student = await Student.findById(id); // Find the student by ID
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Update student details
    student.name = name || student.name; // Use existing value if not provided
    student.age = age || student.age;
    student.address = address || student.address;
    student.phoneNumber = phoneNumber || student.phoneNumber;
    student.year = year || student.year;

    await student.save(); // Save the updated student

    res.status(200).json(student); // Return the updated student
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating student", error: error.message });
  }
};
export const getStudentById = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await Student.findOne({ _id: id, createdBy: req.user.id });

    if (!student) {
      return res
        .status(404)
        .json({ message: "Student not found or not authorized to view" });
    }

    res.status(200).json(student);
  } catch (error) {
    console.error("Error fetching student details:", error.message);
    res.status(500).json({
      message: "Error fetching student details",
      error: error.message,
    });
  }
};
