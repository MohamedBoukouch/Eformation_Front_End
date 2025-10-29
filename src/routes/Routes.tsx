import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Profile from "../pages/Profile";
import StudentDashboard from "../pages/StudentDashboard";
import FormationPlayer from "../pages/FormationPlayer";

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup onClose={function (): void {
          throw new Error("Function not implemented.");
        } } />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/student" element={<StudentDashboard />} />
        <Route path="/formation-player" element={<FormationPlayer />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
