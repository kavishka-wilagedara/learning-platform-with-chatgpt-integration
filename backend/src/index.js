const express = require("express")
const dotenv = require("dotenv").config()
const dbConnect = require("./config/dbConnection")
const authRoutes = require("./routes/authRoutes")
const courseRoutes = require("./routes/courseRoutes")
const enrollmentRoutes = require("./routes/enrollmentRoutes")

dbConnect()

const app = express()

// Middleware
app.use(express.json())

// Auth routes
app.use("/api/auth", authRoutes)

// Course routes
app.use("/api/course", courseRoutes)

// Enrollment routes
app.use("/api/enrollment", enrollmentRoutes)

// Start the server
const PORT = process.env.PORT || 7002
app.listen(PORT, () =>{
    console.log(`Server is running on port: ${PORT}`)
})