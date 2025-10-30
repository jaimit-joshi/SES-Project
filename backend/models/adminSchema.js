const mongoose = require("mongoose")

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "Admin",
  },
  schoolName: {
    type: String,
    unique: true,
    required: true,
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
})

module.exports = mongoose.model("admin", adminSchema)
