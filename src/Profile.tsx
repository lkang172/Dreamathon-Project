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

        const booksResponse = await fetch(
          `http://localhost:3000/api/tasks/${user._id}`
        );
        if (!booksResponse.ok)
          throw new Error(`HTTP Error! Status: ${booksResponse.status}`);
        const booksData = await booksResponse.json();
        console.log("Books data:", booksData);
        setTasks(booksData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchUserData();
  }, [user]);

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-info">
        <img
          src="https://media.istockphoto.com/id/1471399411/vector/genie-vector-logo.jpg?s=612x612&w=0&k=20&c=s2yLmHyX1f3O8cOy2iRMdaZ_Horu80TArq6ajHmzJ-g="
          alt={userData.name || "User"}
          className="profile-photo"
        />
        <h1 className="profile-name">Welcome, {userData.username}</h1>
        <p className="profile-username">@{userData.username}</p>
        <p className="profile-bio">Good luck!</p>
      </div>
      <div className="books-container">
        <h2 className="books-title">My Tasks:</h2>
        <div className="book-list">
          {tasks.map((task, index) => (
            <div key={index} className="book-item">
              <img
                src="https://images.pond5.com/magic-wiccan-old-book-cover-illustration-238909602_iconl_nowm.jpeg"
                alt={`Book ${task.taskName}`}
                className="book-cover"
              />
              <h3 className="book-title">{task.taskDescription}</h3>
              <p className="book-date">
                Created on:{" "}
                {new Date(task.taskDeadline).toISOString().split("T")[0]}
              </p>

              <button className="input-button">Open</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
