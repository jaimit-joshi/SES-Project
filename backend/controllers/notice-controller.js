const Notice = require("../models/noticeSchema.js")

const noticeCreate = async (req, res) => {
  try {
    const notice = new Notice({
      ...req.body,
      school: req.body.adminID,
    })
    const result = await notice.save()
    res.send(result)
  } catch (err) {
    res.status(500).json(err)
  }
}

const noticeList = async (req, res) => {
  try {
    const notices = await Notice.find({ school: req.params.id })
    if (notices.length > 0) {
      res.send(notices)
    } else {
      res.send({ message: "No notices found" })
    }
  } catch (err) {
    res.status(500).json(err)
  }
}

const updateNotice = async (req, res) => {
  try {
    const result = await Notice.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
    res.send(result)
  } catch (error) {
    res.status(500).json(error)
  }
}

const deleteNotice = async (req, res) => {
  try {
    const result = await Notice.findByIdAndDelete(req.params.id)
    res.send(result)
  } catch (error) {
    res.status(500).json(error)
  }
}

const deleteNotices = async (req, res) => {
  try {
    const result = await Notice.deleteMany({ school: req.params.id })
    if (result.deletedCount === 0) {
      res.send({ message: "No notices found to delete" })
    } else {
      res.send(result)
    }
  } catch (error) {
    res.status(500).json(error)
  }
}

const markNoticeAsRead = async (req, res) => {
  try {
    const { userId, userType } = req.body

    if (!["student", "teacher"].includes(userType)) {
      return res.status(400).json({ message: "Invalid user type" })
    }

    const notice = await Notice.findById(req.params.id)

    if (!notice) {
      return res.status(404).json({ message: "Notice not found" })
    }

    // Check if user already marked as read
    const alreadyRead = notice.readBy.some((read) => read.userId.toString() === userId && read.userType === userType)

    if (!alreadyRead) {
      notice.readBy.push({
        userId,
        userType,
        readAt: new Date(),
      })
      await notice.save()
    }

    res.send(notice)
  } catch (err) {
    res.status(500).json(err)
  }
}

const unmarkNoticeAsRead = async (req, res) => {
  try {
    const { userId, userType } = req.body

    const notice = await Notice.findById(req.params.id)

    if (!notice) {
      return res.status(404).json({ message: "Notice not found" })
    }

    notice.readBy = notice.readBy.filter((read) => !(read.userId.toString() === userId && read.userType === userType))

    await notice.save()
    res.send(notice)
  } catch (err) {
    res.status(500).json(err)
  }
}

module.exports = {
  noticeCreate,
  noticeList,
  updateNotice,
  deleteNotice,
  deleteNotices,
  markNoticeAsRead,
  unmarkNoticeAsRead,
}
