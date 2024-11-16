import mongoose from 'mongoose';
import Payment from './paymentModel.js'; // Import Payment model
const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    address: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    year: { type: String, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});



studentSchema.pre('remove', async function (next) {
    // Delete associated payments before removing the student
    await Payment.deleteMany({ id: this._id });
    next();
});




const Student = mongoose.model('Student', studentSchema);

export default Student;
