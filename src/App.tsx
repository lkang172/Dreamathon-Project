/*import { useState } from "react";
import Input from "./Input";
import "./App.css";
import Login from "./Login";
import { User } from "./types";

function App() {
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

  console.log(task);

  return (
    <>
      <h1>Wrapped</h1>
      <Login onLogin={handleLogin}></Login>
      <Input></Input>
      <div className="App">
        // <div>
        //   <textarea
        //     onChange={(e) => setTask(e.target.value)}
        //     placeholder="Add a task to the list"
        //     cols={50}
        //     rows={5}
        // </div>
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
}

export default App;*/

// App.tsx

import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { User } from "./types";
import Navbar from "./Navbar";
import Home from "./Home";
import Profile from "./Profile";
import Login from "./Login";
import "./App.css";
import Input from "./Input";

function App() {
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = (userData: User) => {
    setUser(userData);
  };

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={
              user ? (
                <Navigate to="/profile" />
              ) : (
                <Login onLogin={handleLogin} />
              )
            }
          />
          <Route
            path="/input"
            element={user ? <Input user={user} /> : <Navigate to="/login" />}
          />
          <Route
            path="/profile"
            element={user ? <Profile user={user} /> : <Navigate to="/login" />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
