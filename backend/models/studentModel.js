import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    address: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    year: { type: String, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

const Student = mongoose.model('Student', studentSchema);

export default Student;
