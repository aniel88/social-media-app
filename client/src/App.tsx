import React from "react";
import "./App.css";
import "./index";
import Button from "./components/Button";

function App() {
  return (
    <div>
      <h1 className="text-3xl font-bold underline ">Hello world!</h1>
      <Button variant="primary" size="medium" isDisabled={false}>
        Button
      </Button>
    </div>
  );
}

export default App;
