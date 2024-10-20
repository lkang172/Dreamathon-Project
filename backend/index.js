import express from "express";
import User from "./User.model.js";
import Task from "./Task.model.js";
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
    console.log(`Fetching tasks for user ID: ${userId}`); // Debugging
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

app.delete("/api/tasks/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTask = await Task.findByIdAndDelete(id);
    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting task", error: error.message });
  }
});

app.post("/api/tasks/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const newTask = {
      taskName: req.body.taskName, // Expecting a string
      taskDescription: req.body.taskDescription, // Expecting a string
      taskDeadline: req.body.taskDeadline, // Expecting a string
      taskSubject: req.body.taskSubject, // Expecting a string
      dateCreated: new Date(), // Add a dateCreated field
    };

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $push: { tasks: newTask } },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(201).json(updatedUser); // Optionally return updated user data
  } catch (error) {
    console.error("Error adding task:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.listen(3000, () => {
  connectDB();
  console.log("Server is running");
});
