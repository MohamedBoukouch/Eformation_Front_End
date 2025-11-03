import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Profile from "../pages/Profile";
import StudentDashboard from "../pages/StudentDashboard";
import FormationPlayer from "../pages/FormationPlayer";
import WaitingPage from "../pages/waitingPage";
import ProfessorLayout from "../layouts/ProfessorLayout";
import Dashboard from "../pages/Professor/dashboard/Dashboard";
import Students from "../pages/Professor/manageStudent/Students";
import Playlist from "../pages/Professor/dashboard/Playlist";

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/student" element={<StudentDashboard />} />
        <Route path="/formation-player" element={<FormationPlayer />} />
        <Route path="/waitingPage" element={<WaitingPage />} />

        {/* Professor routes (nested inside the layout) */}
        <Route path="/professor" element={<ProfessorLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="students" element={<Students />} />
          <Route path="playlists" element={<Playlist />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
