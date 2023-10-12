const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

//userDetails Model
const userDetailsSchema = require("./userSchema");

// Connect to MongoDB
mongoose.connect(
  "mongodb+srv://mathan:mathan123@cluster0.slq6nhk.mongodb.net/?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// Define a Mongoose schema for user registration data
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const User = mongoose.model("User", userSchema);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Create a POST route for user registration
app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log(req.body);

    // Create a new user document
    const newUser = new User({
      name,
      email,
      password,
    });

    // Save the user data to MongoDB
    await newUser.save();

    res.json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: "Registration failed" });
  }
});
//login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.json({ err: "invalid email" });
  }

  if (user.password !== password) {
    return res.json({ err: "invalid password" });
  }

  res.json({ msg: "login successfully" });
});

//userdetails form
app.post("/userdetails", async (req, res) => {
  // Create a new user document
  const newUser = new userDetailsSchema({
    ...req.body,
  });

  // Save the user data to MongoDB
  await newUser.save();
  res.json({ msg: "user form submitted" });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
