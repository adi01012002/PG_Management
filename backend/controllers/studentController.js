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


import Student from '../models/studentModel.js';

export const addStudent = async (req, res) => {
  try {
    // `req.user` is set by your auth middleware and contains the user ID
    const userId = req.user.id;
    console.log(userId)
    // Create a new student with `createdBy` set to the user’s ID
    const student = new Student({
      ...req.body,
      createdBy: userId
    });

    // Save the student to the database
    await student.save();
    res.status(201).json({ message: "Student created successfully", student });
  } catch (error) {
    res.status(500).json({ message: "Error creating student", error });
  }
};

export const getAllStudents = async (req, res) => {
    try {
      const userId = req.user.id;  // User ID from the authenticated request
    //   console.log(userId)
      const students = await Student.find({ createdBy: userId }); // Find students linked to the owner
    //   console.log(students)
      res.status(200).json(students);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching students', error });
    }
  };