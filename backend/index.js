import express from "express";
import User from "./User.model.js";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./db.js";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(express.urlencoded({ extended: true }));

app.post("/api/login", async (req, res) => {
  console.log(req.body); // Log to check request body
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user || user.password !== password) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    res.status(200).json({
      _id: user._id,
      username: user.username,
      name: user.name,
      tasks: user.tasks,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/api/signup", async (req, res) => {
  const { username, password } = req.body;
  console.log(req.body);
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }
  try {
    const user = new User({ username, password, books: [] });

    await user.save();
    console.log("User saved successfully");
    res.status(200).json({ message: "User created successfully", username });
  } catch (error) {
    console.error("Error creating user", error);
    return res.status(500).json("Invalid entry");
  }
});

app.get("/api/user/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ username: user.username, name: user.name, tasks: user.tasks });
    console.log("Sending user data:", user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/api/tasks/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(req.params.userId).populate("tasks");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user.books);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/api/tasks/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(req.params.userId).populate("books");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user.books);
    console.log("Tasks fetched");
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/api/tasks/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const newTask = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $push: { tasks: newTask } },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res
      .status(201)
      .json({ message: "Task added successfully", tasks: updatedUser.tasks });
  } catch (error) {
    console.error("Error adding books:", error);
    res.status(500).json({ message: "Server error" });
  }
});
app.listen(3000, () => {
  connectDB();
  console.log("Server is running");
});
