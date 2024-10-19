import React, { useState } from "react";
import "./Input.css";
import { useNavigate } from "react-router-dom";

interface InputData {
  theme: string;
  lesson: string;
}

/*interface InputProps {
  user: User | null; // Keep user prop to manage user authentication
}*/
const Input = () => {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="input-container">
      <h1>Tasks</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-wrapper">
          <label htmlFor="taskName">Task:</label>
          <input
            type="text"
            id="taskName"
            name="taskName"
            required
            placeholder="e.g. Java Homework 6"
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
