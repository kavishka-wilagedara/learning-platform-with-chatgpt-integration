const express = require("express")
const dotenv = require("dotenv").config()
const dbConnect = require("./config/dbConnection")

dbConnect()

const app = express()

// Middleware
app.use(express.json())

// Routes

// Start the server
const PORT = process.env.PORT || 7002
app.listen(PORT, () =>{
    console.log(`Server is running on port: ${PORT}`)
})