import React, { useEffect } from "react";
import "./App.css";
import "./index";
import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import ConfirmRegister from "./pages/Register/ConfirmRegister";
import SuccessRegister from "./pages/Register/SuccessRegister";
import UserProfile from "./pages/UserProfile/UserProfile";

function App() {
  useEffect(() => {
    document.body.style.backgroundColor = "#F3F4F6";
  });
  return (
    <div className="h-full">
      <HashRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/:userName" element={<UserProfile />} />
          {/* Secured routes by token */}
          <Route
            path="/register/success/:token"
            element={<SuccessRegister />}
          />
          <Route
            path="/register/confirm/:token"
            element={<ConfirmRegister />}
          />

          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
