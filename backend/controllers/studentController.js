import Student from "../models/studentModel.js";
import PG from "../models/PgModel.js";
import Payment from "../models/paymentModel.js"; // Import your Payment model
import User from "../models/userModel.js"; // User model for authentication
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
// Helper function to generate JWT token
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "1d" });
};


export const addStudent = async (req, res) => {
  try {
    const ownerId = req.user.id; // ID of the PG owner (set by auth middleware)
    const { username, email, password, pgId } = req.body;
    console.log(pgId, ownerId);
    // console.log(pg)
    if (!mongoose.Types.ObjectId.isValid(pgId)) {
      return res.status(400).json({ message: "Invalid PG ID" });
    }

    // Validate input fields
    if (!username || !email || !password || !pgId) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Fetch the specific PG based on the `pgId` provided in the form
    const pg = await PG.findOne({ _id: pgId, owner: ownerId });
    console.log(pgId, ownerId);
    console.log(pg);

    // const { pg.id } = req.body;

    if (!pg) {
      return res
        .status(404)
        .json({ message: "PG not found or unauthorized access" });
    }

    // Check if there's space available (based on beds or rooms)
    if (pg.availableBeds <= 0 || pg.availableRooms <= 0) {
      return res
        .status(400)
        .json({ message: "No available beds or rooms in the selected PG" });
    }

    // Create a new user (Student account)
    const newUser = new User({
      username,
      email,
      password,
      role: "student", // Assign the role as 'student'
    });

    // Save the new user to the database
    await newUser.save();

    // Create a new student linked to the specific PG and the user account
    const newStudent = new Student({
      ...req.body,
      userId: newUser._id, // Reference the user's ID
      pgId: pg._id, // Reference the selected PG's ID
      createdBy: ownerId, // Set the creator as the logged-in PG owner
    });

    // Save the student to the database
    await newStudent.save();

    // Update the PG data
    pg.students.push(newStudent._id); // Add the student to the PG's list
    pg.availableBeds -= 1;
    pg.availableRooms -= 1;

    // Save the updated PG data to the database
    await pg.save();

    res.status(201).json({
      message: "Student successfully added and registered",
      student: newStudent,
      loginDetails: {
        email: newUser.email,
        password, // PG owner should share this with the student
      },
    });
  } catch (error) {
    console.error("Error adding student:", error);
    res
      .status(500)
      .json({ message: "Error adding student", error: error.message });
  }
};

export const getAllStudents = async (req, res) => {
  try {
    const userId = req.user.id; // User ID from the authenticated request
    //   console.log(userId)

    const students = await Student.find({ createdBy: userId }).populate(
      "pgId",
      "name"
    ); // Find students linked to the owner
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
    // console.log(student._id)
    // console.log(id)
    // console.log(student.id)
    await Payment.deleteMany({ id: student._id });

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
  const { username, age, email, address, phone, year } = req.body; // Get the updated data

  try {
    const student = await Student.findById(id).populate("userId"); // Find the student by ID
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Update student details
    student.username = username || student.username; // Use existing value if not provided
    student.age = age || student.age;
    student.address = address || student.address;
    student.phone = phone || student.phone;
    student.year = year || student.year;
    student.email = email || student.email;
    // // If email is being updated, update the associated user's email
    // if (email && email !== student.email) {
    //   const user = await User.findById(student.userId);
    //   if (user) {
    //     user.email = email;
    //     await user.save();
    //   }
    //   student.email = email;
    // }
    // await student.save(); // Save the updated student

    // Update the associated user details (username, email)
    const user = student.userId; // Retrieve the associated User
    // Update the associated user details (email, username)
    console.log(user);
    if (email) user.email = email;
    if (username) user.username = username;

    // Save updated user and student details
    // Save the new user to the database
    await user.save();
    // await User.save();  // Save the user (email, username)
    await student.save(); // Save the student details

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
    const student = await Student.findOne({ _id: id, createdBy: req.user.id })
      .populate("pgId", "name") // Populate PG's name
      .populate("createdBy", "username");

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

// // Student Registration (Add Student)
// export const registerStudent = async (req, res) => {
//   try {
//     const { username, email, password, pgId } = req.body;

//       // Validate fields
//       if (!username || !email || !password || !pgId) {
//         return res.status(400).json({ message: "All fields are required" });
//       }
//     // Check if the email already exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: 'User already exists' });
//     }

//     // Hash the password
//     // const hashedPassword = await bcrypt.hash(password, 10);

//     // Create a new user (Student)
//     const user = new User({
//       username,
//       email,
//       password,
//       role: 'student', // The role should be 'student'
//     });

//     // Save the user to the database
//     await user.save();

//     // Create a Student document, linking the User to a PG
//     const student = new Student({
//       userId: user._id,
//       pgId, // Reference to the PG the student is associated with
//     });

//     // Save the Student to the database
//     await student.save();

//     // Generate a JWT token
//     const token = generateToken(user._id, 'student');

//     // Respond with the token
//     res.status(201).json({
//       message: 'Student registered successfully',
//       token,
//     });
//   } catch (error) {
//     console.error('Error during student registration:', error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// };

export const loginStudent = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Find the user by email
    const user = await User.findOne({ email });
    console.log(user);
    // if (!user) {
    //   return res.status(400).json({ message: 'Invalid credentials' });
    // }

    // Check if the password matches
    const isMatch = await user.matchPassword(password);
    console.log(isMatch, password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Check if the password matches
    const isPasswordValid = await user.matchPassword(password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate JWT token
    const token = generateToken(user._id, "student");

    // Send the token in the response
    res.status(200).json({
      message: "Login successful",
      token,
    });
  } catch (error) {
    console.error("Error during student login:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Fetch Student Profile
// export const getStudentProfile = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const student = await Student.findById(id).select("-password"); // Exclude password
//     if (!student) {
//       return res.status(404).json({ message: "Student not found" });
//     }
//     res.status(200).json(student);
//   } catch (error) {
//     res.status(500).json({ message: "Server Error", error: error.message });
//   }
// };

export const getStudentProfile = async (req, res) => {
  // console.log(req.user)
  try {
    const studentId = req.user._id; // Assuming `studentId` is stored in the user payload
    // console.log(studentId)
    const student = await Student.findOne({ userId: studentId })
      .populate("pgId", "name") // Populate PG's name
      .populate("createdBy", "username")
      .select("-password"); // Exclude password;

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fetch Payments Made by the Student
export const getStudentPayments = async (req, res) => {
  // const { id } = req.params;
  const studentId = req.user._id;
  const student = await Student.findOne({ userId: studentId });
  // student.id
  try {
    const payments = await Payment.find({ id: student.id });
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
