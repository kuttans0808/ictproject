const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = 4000;

// Connect to MongoDB
mongoose.connect('mongodb+srv://harikuttan87:harikuttan87@cluster0.tfyh8w1.mongodb.net/ecodb4?retryWrites=true&w=majority&appName=cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// User schema
const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
});
const User = mongoose.model('User', userSchema);

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Register route
app.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ Email });
    if (existingUser) {
        return res.status(400).json({ error: 'Email already registered' });
    }

    const newUser = new User({ username, email, password });
    await newUser.save();

    res.json({ message: 'Registration successful' });
});

// Login route
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email, password });
    if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }

    res.json({ message: 'Login successful', user: { username: user.username, email } });
});

// Start server
app.listen(4000, () => {
    console.log(`Server running at http://localhost:${4000}`);
});
