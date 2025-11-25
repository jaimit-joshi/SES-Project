const bcrypt = require("bcrypt")
const mongoose = require("mongoose")
const Student = require("../models/studentSchema.js")
const Subject = require("../models/subjectSchema.js")

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id)

// ✅ Register Student
const studentRegister = async (req, res) => {
  try {
    const { rollNum, adminID, sclassName, password, name, email } = req.body

    if (!rollNum || !adminID || !sclassName || !password || !name || !email) {
      return res.status(400).json({ error: "All required fields must be provided" })
    }

    if (!isValidObjectId(sclassName)) {
      return res.status(400).json({ error: "Invalid class reference" })
    }

    const existingStudent = await Student.findOne({
      rollNum: String(rollNum),
      school: adminID,
      sclassName,
    })
    if (existingStudent) {
      return res.status(400).json({ error: "Roll number already exists" })
    }

    const hashedPass = await bcrypt.hash(password, 10)
    const student = new Student({
      rollNum: String(rollNum),
      name,
      email,
      sclassName,
      school: adminID,
      password: hashedPass,
    })

    const result = await student.save()
    result.password = undefined
    res.status(201).json({ message: "User registered successfully", student: result })
  } catch (error) {
    console.error("Student registration failed:", error)
    res.status(500).json({ error: "Server error during registration" })
  }
}

// ✅ Login Student
const studentLogIn = async (req, res) => {
  try {
    const { rollNum, name, studentName, password } = req.body
    const studentNameValue = name || studentName

    if (!rollNum || !studentNameValue || !password) {
      return res.status(400).json({ error: "Missing login credentials" })
    }

    const student = await Student.findOne({ rollNum: String(rollNum), name: studentNameValue })
      .populate("school", "schoolName")
      .populate("sclassName", "sclassName")

    if (!student) {
      return res.status(404).json({ error: "Student not found" })
    }

    const isValid = await bcrypt.compare(password, student.password)
    if (!isValid) {
      return res.status(401).json({ error: "Invalid password" })
    }

    student.password = undefined
    res.status(200).json({
      message: "Login successful",
      role: "Student",
      ...student._doc,
    })
  } catch (error) {
    console.error("Login failed:", error)
    res.status(500).json({ error: "Server error during login" })
  }
}

// ✅ Get All Students (by admin or class)
const getStudents = async (req, res) => {
  try {
    const students = await Student.find({ school: req.params.id }).populate("sclassName", "sclassName")
    if (!students.length) return res.status(404).json({ message: "No students found" })
    const sanitized = students.map((s) => ({ ...s._doc, password: undefined }))
    res.status(200).json(sanitized)
  } catch (error) {
    console.error("Fetching students failed:", error)
    res.status(500).json({ error: "Server error" })
  }
}

// ✅ Get Single Student
const getStudentDetail = async (req, res) => {
  try {
    const { id } = req.params
    if (!isValidObjectId(id)) return res.status(404).json({ error: "Invalid student ID" })

    const student = await Student.findById(id)
      .populate("school", "schoolName")
      .populate("sclassName", "sclassName")
      .populate("examResult.subName", "subName subCode sessions")
      .populate("attendance.subName", "subName subCode sessions")

    if (!student) return res.status(404).json({ error: "Student not found" })
    student.password = undefined
    res.status(200).json(student)
  } catch (error) {
    console.error("Fetching student detail failed:", error)
    res.status(500).json({ error: "Server error" })
  }
}

// ✅ Update Student Info
const updateStudent = async (req, res) => {
  try {
    const { id } = req.params
    if (!isValidObjectId(id)) return res.status(404).json({ error: "Invalid student ID" })

    const updates = req.body
    if (updates.password) {
      updates.password = await bcrypt.hash(updates.password, 10)
    }

    const updatedStudent = await Student.findByIdAndUpdate(id, updates, { new: true })
      .populate("school", "schoolName")
      .populate("sclassName", "sclassName")
      .populate("examResult.subName", "subName subCode sessions")
      .populate("attendance.subName", "subName subCode sessions")

    if (!updatedStudent) return res.status(404).json({ error: "Student not found" })

    updatedStudent.password = undefined

    // Return the student in the same format as login for consistency
    res.status(200).json({
      message: "Profile updated successfully",
      role: "Student",
      ...updatedStudent._doc,
    })
  } catch (error) {
    console.error("Update student failed:", error)
    res.status(500).json({ error: "Server error" })
  }
}

// ✅ Delete Single Student
const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params
    if (!isValidObjectId(id)) return res.status(404).json({ error: "Invalid student ID" })

    const deleted = await Student.findByIdAndDelete(id)
    if (!deleted) return res.status(404).json({ error: "Student not found" })

    res.status(200).json({ message: "Student deleted successfully" })
  } catch (error) {
    console.error("Delete student failed:", error)
    res.status(500).json({ error: "Server error" })
  }
}

// ✅ Delete Multiple Students
const deleteStudents = async (req, res) => {
  try {
    const { id } = req.params // adminID
    const result = await Student.deleteMany({ school: id })
    res.status(200).json({ message: `${result.deletedCount} students deleted successfully` })
  } catch (error) {
    console.error("Bulk delete students failed:", error)
    res.status(500).json({ error: "Server error" })
  }
}

// ✅ Delete Students By Class
const deleteStudentsByClass = async (req, res) => {
  try {
    const { id } = req.params
    if (!isValidObjectId(id)) return res.status(404).json({ error: "Invalid class ID" })

    const result = await Student.deleteMany({ sclassName: id })
    res.status(200).json({ message: `${result.deletedCount} students removed from class` })
  } catch (error) {
    console.error("Delete students by class failed:", error)
    res.status(500).json({ error: "Server error" })
  }
}

// ✅ Student Attendance
const studentAttendance = async (req, res) => {
  try {
    const { id } = req.params
    const { subName, status, date } = req.body

    if (!isValidObjectId(id)) return res.status(404).json({ error: "Invalid student ID" })
    if (!subName || !status || !date) return res.status(400).json({ error: "Missing attendance data" })

    const student = await Student.findById(id)
    if (!student) return res.status(404).json({ error: "Student not found" })

    const attendanceEntry = {
      subName: isValidObjectId(subName) ? subName : null,
      status,
      date,
    }

    student.attendance.push(attendanceEntry)
    await student.save()

    res.status(201).json({ message: "Attendance recorded", student })
  } catch (error) {
    console.error("Attendance update failed:", error)
    res.status(500).json({ error: "Server error" })
  }
}

// ✅ Update Exam Result
const updateExamResult = async (req, res) => {
  try {
    const { id } = req.params
    const { subject, marksObtained } = req.body

    if (!isValidObjectId(id)) return res.status(404).json({ error: "Invalid student ID" })

    const student = await Student.findById(id)
    if (!student) return res.status(404).json({ error: "Student not found" })

    student.examResult.push({ subName: subject, marksObtained })
    await student.save()

    res.status(200).json({ message: "Exam result updated", student })
  } catch (error) {
    console.error("Update exam result failed:", error)
    res.status(500).json({ error: "Server error" })
  }
}

// ✅ Clear Attendance
const clearAllStudentsAttendance = async (req, res) => {
  try {
    await Student.updateMany({}, { $set: { attendance: [] } })
    res.status(200).json({ message: "All attendance cleared" })
  } catch (error) {
    console.error("Clear attendance failed:", error)
    res.status(500).json({ error: "Server error" })
  }
}

// ✅ Clear Attendance By Subject
const clearAllStudentsAttendanceBySubject = async (req, res) => {
  try {
    const { id } = req.params // subject id
    if (!isValidObjectId(id)) return res.status(404).json({ error: "Invalid subject ID" })

    await Student.updateMany({}, { $pull: { attendance: { subName: id } } })
    res.status(200).json({ message: "Attendance cleared for subject" })
  } catch (error) {
    console.error("Clear attendance by subject failed:", error)
    res.status(500).json({ error: "Server error" })
  }
}

// ✅ Remove Student Attendance By Subject
const removeStudentAttendanceBySubject = async (req, res) => {
  try {
    const { id } = req.params // student id
    const { subName } = req.body
    if (!isValidObjectId(id)) return res.status(404).json({ error: "Invalid student ID" })

    const student = await Student.findById(id)
    if (!student) return res.status(404).json({ error: "Student not found" })

    student.attendance = student.attendance.filter((a) => a.subName.toString() !== subName)

    await student.save()
    res.status(200).json({ message: "Student subject attendance removed", student })
  } catch (error) {
    console.error("Remove student attendance by subject failed:", error)
    res.status(500).json({ error: "Server error" })
  }
}

// ✅ Remove All Attendance for a Student
const removeStudentAttendance = async (req, res) => {
  try {
    const { id } = req.params
    if (!isValidObjectId(id)) return res.status(404).json({ error: "Invalid student ID" })

    const student = await Student.findByIdAndUpdate(id, { attendance: [] }, { new: true })
    if (!student) return res.status(404).json({ error: "Student not found" })

    res.status(200).json({ message: "All attendance removed for student", student })
  } catch (error) {
    console.error("Remove all student attendance failed:", error)
    res.status(500).json({ error: "Server error" })
  }
}

module.exports = {
  studentRegister,
  studentLogIn,
  getStudents,
  getStudentDetail,
  updateStudent,
  deleteStudent,
  deleteStudents,
  deleteStudentsByClass,
  studentAttendance,
  updateExamResult,
  clearAllStudentsAttendanceBySubject,
  clearAllStudentsAttendance,
  removeStudentAttendanceBySubject,
  removeStudentAttendance,
}
