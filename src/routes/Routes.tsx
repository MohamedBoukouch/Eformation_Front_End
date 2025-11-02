import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Profile from "../pages/Profile";
import ProfessorLayout from "../layouts/ProfessorLayout";
import Dashboard from "../pages/Professor/dashboard/Dashboard";
import Students from "../pages/Professor/manageStudent/Students";
import Playlist from "../pages/Professor/managePlaylist/Playlist/Playlist";


const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
   

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
