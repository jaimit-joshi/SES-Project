const Complain = require("../models/complainSchema.js")
const Student = require("../models/studentSchema.js")
const Teacher = require("../models/teacherSchema.js")

const complainCreate = async (req, res) => {
  try {
    const complain = new Complain(req.body)
    const result = await complain.save()
    res.send(result)
  } catch (err) {
    res.status(500).json(err)
  }
}

const complainList = async (req, res) => {
  try {
    const complains = await Complain.find({ school: req.params.id })

    // For each complaint, try to find the user in both Student and Teacher collections
    const complainsWithUsers = await Promise.all(
      complains.map(async (complain) => {
        const complainObj = complain.toObject()

        // Try to find in Student collection first
        let user = await Student.findById(complain.user).select("name role")

        // If not found, try Teacher collection
        if (!user) {
          user = await Teacher.findById(complain.user).select("name role")
        }

        complainObj.user = user
        return complainObj
      }),
    )

    if (complainsWithUsers.length > 0) {
      res.send(complainsWithUsers)
    } else {
      res.send({ message: "No complains found" })
    }
  } catch (err) {
    res.status(500).json(err)
  }
}

const updateComplainStatus = async (req, res) => {
  try {
    const { status } = req.body
    if (!["pending", "resolved"].includes(status)) {
      return res.status(400).json({ message: "Invalid status. Must be 'pending' or 'resolved'" })
    }

    const result = await Complain.findByIdAndUpdate(req.params.id, { status }, { new: true })

    if (result) {
      // Try to find user in both collections
      let user = await Student.findById(result.user).select("name role")
      if (!user) {
        user = await Teacher.findById(result.user).select("name role")
      }

      const resultObj = result.toObject()
      resultObj.user = user
      res.send(resultObj)
    } else {
      res.send({ message: "Complaint not found" })
    }
  } catch (err) {
    res.status(500).json(err)
  }
}

const getComplainsByUser = async (req, res) => {
  try {
    const complains = await Complain.find({ user: req.params.id })
    if (complains.length > 0) {
      res.send(complains)
    } else {
      res.send({ message: "No complains found" })
    }
  } catch (err) {
    res.status(500).json(err)
  }
}

module.exports = { complainCreate, complainList, updateComplainStatus, getComplainsByUser }
