import React from "react";
import "./App.css";
import "./index";
import { HashRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import { ThemeProvider } from "@mui/material";

function App() {
  return (
    <div>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
