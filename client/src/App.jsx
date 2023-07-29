import React, { useState } from "react";

import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  const callBackEnd = async () => {
    try {
      const response = await fetch("/users");
      const data = await response.json();
      console.log("data", data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <>
      <h1>hello world</h1>
      <button onClick={callBackEnd}>Obtener datos</button>
    </>
  );
}

export default App;
