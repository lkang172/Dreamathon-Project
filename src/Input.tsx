import React, { useState } from "react";
//import { getAIResponse } from "./openaiService";
//import { storeResponseInDB } from './databaseService';
import "./Input.css";
import { User } from "./types";
//import { useNavigate } from "react-router-dom";

interface InputData {
  theme: string;
  lesson: string;
}

interface InputProps {
  user: User | null; // Keep user prop to manage user authentication
}
const Input: React.FC<InputProps> = ({ user }) => {
  const [description, setDescription] = useState("");
  const [taskName, setTaskName] = useState("");
  const [deadline, setDeadline] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [subject, setSubject] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:3000/api/tasks/${user._id}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            taskName: taskName,
            taskDescription: description,
            taskDeadline: deadline,
            taskSubject: subject,
          }),
        }
      );
      setTaskName("");
      setDescription("");
      setDeadline("");
      setSubject("");
    } catch (error) {
      console.error("Error", error);
    }
  };

  return (
    <div className="input-container">
      <h1>Add a Task</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-wrapper">
          <label htmlFor="taskName">Task:</label>
          <input
            type="text"
            id="taskName"
            name="taskName"
            required
            placeholder="e.g. Java Homework 6"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
          />
        </div>
        <div className="input-wrapper">
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            name="description"
            required
            placeholder="e.g. Create an animal class"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="input-wrapper">
          <label htmlFor="deadline">Days until due</label>
          <input
            type="text"
            id="deadline"
            name="deadline"
            required
            placeholder="e.g. 6"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
          />
        </div>
        <div className="input-wrapper">
          <label htmlFor="subject">Subject</label>
          <input
            type="text"
            id="subject"
            name="subject"
            required
            placeholder="e.g. Math"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>
        <button className="button" type="submit">
          Add
        </button>
      </form>
    </div>
  );
};

export default Input;
