const mongoose = require("mongoose")

const noticeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    details: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    school: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "admin",
    },
    readBy: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          refPath: "readBy.userType",
        },
        userType: {
          type: String,
          enum: ["student", "teacher"],
        },
        readAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true },
)

module.exports = mongoose.model("notice", noticeSchema)
