// models/Student.js
const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: String,
  rollNumber: String,
  block: String,
  roomNumber: String,
  studentId: String,
  phoneNumber: String,
  parentContact: String,
  department: String,
  attendance: {
    type: String,
    enum: ['Present', 'Absent', 'Out'],
    default: 'Absent',
  }
});

module.exports = mongoose.model('Student', studentSchema);
