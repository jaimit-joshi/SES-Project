const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const dotenv = require("dotenv")

dotenv.config()

const app = express()
const Routes = require("./routes/route.js")

const PORT = process.env.PORT || 5001

console.log("[v0] Environment variables loaded:")
console.log("[v0] PORT:", process.env.PORT)
console.log("[v0] MONGO_URL:", process.env.MONGO_URL ? "Set (hidden for security)" : "NOT SET")

app.use(express.json({ limit: "10mb" }))
app.use(cors())

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB successfully")
  })
  .catch((err) => {
    console.log("MongoDB connection failed:", err.message)
    console.log("[v0] Attempted connection string format:", process.env.MONGO_URL ? "Valid format" : "UNDEFINED")
    console.log("Make sure MongoDB is running locally or update MONGO_URL in .env file")
  })

app.use("/", Routes)

app.listen(PORT, () => {
  console.log(`Server started at port no. ${PORT}`)
})
