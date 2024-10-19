import { useState } from "react";
import Input from "./Input";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>Wrapped</h1>
      <Input></Input>
    </>
  );
}

export default App;
