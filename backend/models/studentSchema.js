const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  rollNum: {
    type: String, // changed from Number → String to avoid CastError during login/register
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  sclassName: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "sclass",
    required: true,
  },
  school: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "admin",
    required: true,
  },
  role: {
    type: String,
    default: "Student",
  },
  email: {
    type: String,
    default: "",
  },
  phone: {
    type: String,
    default: "",
  },
  address: {
    type: String,
    default: "",
  },
  profilePicture: {
    type: String,
    default: "",
  },
  dateOfBirth: {
    type: Date,
  },
  examResult: [
    {
      subName: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "subject",
      },
      marksObtained: {
        type: Number,
        default: 0,
      },
    },
  ],
  attendance: [
    {
      date: {
        type: Date,
        required: true,
      },
      status: {
        type: String,
        enum: ["Present", "Absent"],
        required: true,
      },
      subName: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "subject",
        required: true,
      },
    },
  ],
  notificationPreferences: {
    email: {
      type: Boolean,
      default: true,
    },
    sms: {
      type: Boolean,
      default: false,
    },
  },
});

module.exports = mongoose.model("student", studentSchema);
