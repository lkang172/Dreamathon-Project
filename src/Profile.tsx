import React, { useEffect, useState } from "react";
import "./Profile.css";
import "./Input.css";
import dotenv from "dotenv";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

dotenv.config();

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

  //API CALLS BELOW
  const [response, setResponse] = useState("");

  async function callOpenAIAPI() {
    console.log("Calling OpenAI API");

    //-H "Content-Type: application/json" \
    //-H "Authorization: Bearer $OPENAI_API_KEY" \

    const APIBody = {
      "model": "gpt-4o",
      "prompt": "Given these tasks and their descriptions, return a JSON file sorted from highest to least priority. " + tasks,
      "temperature": 0.7,
      "max_tokens": 64,
      "top_p": 1
    }

    await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + REACT_APP_OPENAI_API_KEY
      }
      body: JSON.stringify(APIBody)
      }).then((data) => {
      return data.json();
      }).then((data) => {
      console.log(data);
      setResponse(data.choices[0].text.trim());
    });
  }//function


  return (
    <>
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
              <h3 className="book-title">{task.taskName}</h3>
              <h3 className="book-title">{task.taskDescription}</h3>
              <p className="book-date">Created on: 10/19/2024</p>

              <button className="input-button">Mark as Done</button>
            </div>
          ))}
        </div>
      </div>
    </div>
        <div>
          <button onClick={() => {
            setTask(e.target.value)
            callOpenAIAPI();
          }}>Wrap task</button>
          {response != "" ?
            <h3>Response to task: {response}</h3>
            :
            null
          }
        </div>
      </div>
    </>

    
  );
};

export default Profile;

/*
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
              <h3 className="book-title">{task.taskName}</h3>
              <h3 className="book-title">{task.taskDescription}</h3>
              <p className="book-date">Created on: 10/19/2024</p>

              <button className="input-button">Mark as Done</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;

*/
