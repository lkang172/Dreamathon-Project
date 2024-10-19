import React, { useEffect, useState } from "react";
import "./Profile.css";
import "./Input.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

interface Task {
  _id: string;
  taskName: string;
  taskDescription: string;
  taskDeadline: string;
  taskSubject: string;
  dateCreated: string;
}

interface UserData {
  _id: string;
  username: string;
  name: string;
  tasks: string[]; // Array of book IDs
}

interface User {
  _id: string;
  username: string;
  name: string;
  // Add other user properties as needed
}

interface ProfileProps {
  user: User | null;
}

//const openBook = () => {};

const Profile: React.FC<ProfileProps> = ({ user }) => {
  const [userData, setUserData] = useState<UserData | null>();
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) return;

      try {
        const response = await fetch(
          `http://localhost:3000/api/user/${user._id}`
        );

        if (!response.ok)
          throw new Error(`HTTP Error! Status: ${response.status}`);
        const data = await response.json();
        console.log("User data:", data);
        setUserData(data);
        setTasks(data.tasks);

        const booksResponse = await fetch(
          `http://localhost:3000/api/tasks/${user._id}`
        );
        if (!booksResponse.ok)
          throw new Error(`HTTP Error! Status: ${booksResponse.status}`);
        const tasksData = await booksResponse.json();
        console.log("Books data:", tasksData);
        setTasks(tasksData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchUserData();
  }, [user]);

  if (!userData) {
    return <div>Loading...</div>;
  }

  const deleteTask = async (taskId: string) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;

    try {
      const response = await fetch(
        `http://localhost:3000/api/tasks/${taskId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok)
        throw new Error(`Error deleting task: ${response.status}`);

      // Filter out the deleted task from the current state
      alert("Task deleted successfully");
    } catch (error) {
      console.error("Error deleting task:", error);
      alert("Error deleting task");
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-info">
        <img
          src="https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg"
          alt={userData.name || "User"}
          className="profile-photo"
        />
        <h1 className="profile-name">Welcome, {userData.username}</h1>
        <p className="profile-username">@{userData.username}</p>
        <p className="profile-bio">Good luck!</p>
      </div>
      <div className="tasks-container">
        <h2 className="books-title">My Tasks:</h2>
        <div className="book-list">
          {tasks.map((task, index) => (
            <div key={index} className="book-item">
              <h3 className="task-title">{task.taskName}</h3>
              <p className="task-text">
                <strong>Description: </strong>
                {task.taskDescription}
              </p>
              <p className="task-text">
                <strong>Subject: </strong>
                {task.taskSubject}
              </p>
              <p className="task-text">
                <strong>Due in: </strong>
                {task.taskDeadline} days
              </p>

              <button
                className="input-button"
                onClick={() => deleteTask(task._id)}
              >
                Mark as Done
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
