const express = require("express")
const mongoose = require("mongoose")
const app = express()

app.use(express.json())

// MongoDB connection
const MONGO_URI = process.env.MONGO_URI || "mongodb://admin:admin@mongodb:27017/userdb?authSource=admin"

mongoose.connect(MONGO_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("MongoDB connection error:", err))

// User Schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    age: Number,
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const User = mongoose.model("User", userSchema)

// Routes
app.get("/", (req, res) => {
    res.send("User Management API")
})

// Add a new user
app.post("/users", async (req, res) => {
    try {
        const user = new User(req.body)
        await user.save()
        res.status(201).json({ message: "User created successfully", user })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

// Get all users or search by query
app.get("/users", async (req, res) => {
    try {
        const { name, email } = req.query
        let query = {}
        
        if (name) query.name = { $regex: name, $options: 'i' }
        if (email) query.email = { $regex: email, $options: 'i' }
        
        const users = await User.find(query)
        res.json({ count: users.length, users })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

// Get a single user by ID
app.get("/users/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if (!user) {
            return res.status(404).json({ error: "User not found" })
        }
        res.json(user)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

// Delete a user by ID
app.delete("/users/:id", async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        if (!user) {
            return res.status(404).json({ error: "User not found" })
        }
        res.json({ message: "User deleted successfully", user })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

// Update a user by ID
app.put("/users/:id", async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        )
        if (!user) {
            return res.status(404).json({ error: "User not found" })
        }
        res.json({ message: "User updated successfully", user })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

