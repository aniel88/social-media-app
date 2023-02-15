import React from "react";
import "./App.css";
import "./index";
import { HashRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import ConfirmRegister from "./pages/Register/ConfirmRegister";
import SuccessRegister from "./pages/Register/SuccessRegister";

function App() {
  return (
    <div className="h-full">
      <HashRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Secured routes by token */}
          <Route
            path="/register/success/:token"
            element={<SuccessRegister />}
          />
          <Route
            path="/register/confirm/:token"
            element={<ConfirmRegister />}
          />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
