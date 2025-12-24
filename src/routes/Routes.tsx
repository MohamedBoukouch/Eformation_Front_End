import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Profile from "../pages/Profile";
import WaitingPage from "../pages/waitingPage";
import StudentDashboard from "../pages/student/StudentDashboard";
import FormationPlayer from "../pages/FormationPlayer";
import Library from "../pages/student/Library";

// Professor
import ProfessorLayout from "../layouts/ProfessorLayout";
import Dashboard from "../pages/Professor/dashboard/Dashboard";
import ManagmentStudents from "../pages/Professor/students/Student";
import Playlist from "../pages/Professor/dashboard/playlist/Playlist";
import EditPlaylist from "../pages/Professor/dashboard/playlist/EditPlaylist";
import VideoPlaylist from "../pages/Professor/dashboard/playlist/VideoPlaylist";

// Layout
import StudentLayout from "../pages/layouts/StudentLayout";

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/waitingPage" element={<WaitingPage />} />

        {/* Student routes with layout */}
        <Route path="/student" element={<StudentLayout />}>
          <Route index element={<StudentDashboard />} />
          <Route path="dashboard" element={<StudentDashboard />} />
          <Route path="formation/:playlistId" element={<FormationPlayer />} />
          <Route path="library" element={<Library />} />
        </Route>

        {/* Professor routes */}
        <Route path="/professor" element={<ProfessorLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="students" element={<ManagmentStudents />} />
          <Route path="playlists" element={<Playlist />} />
          <Route path="edit/:id" element={<EditPlaylist />} />
          <Route path="playlist/videos" element={<VideoPlaylist />} />
          <Route path="playlist/:playlistId/videos" element={<VideoPlaylist />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;



// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Home from "../pages/Home";
// import Login from "../pages/Login";
// import Signup from "../pages/Signup";
// import Profile from "../pages/Profile";
// import StudentDashboard from "../pages/student/StudentDashboard";
// import FormationPlayer from "../pages/FormationPlayer";
// import WaitingPage from "../pages/waitingPage";
// import ProfessorLayout from "../layouts/ProfessorLayout";
// import Dashboard from "../pages/Professor/dashboard/Dashboard";
// import ManagmentStudents from "../pages/Professor/students/Student";
// import Playlist from "../pages/Professor/dashboard/playlist/Playlist";
// import EditPlaylist from "../pages/Professor/dashboard/playlist/EditPlaylist";
// import VideoPlaylist from "../pages/Professor/dashboard/playlist/VideoPlaylist";
// import Library from "../pages/student/Library";

// // import EditPlayList from "../pages/Professor/dashboard/G_playlist/edit_Playlist";

// const AppRoutes: React.FC = () => {
//   return (
//     <Router>
//       <Routes>
//         {/* Public routes */}
//         <Route path="/" element={<Home />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/profile" element={<Profile />} />
        
//         <Route path="/waitingPage" element={<WaitingPage />} />
//         {/* <Route path="/edit" element={<EditPlayList />} /> */}

//         {/* Student */}
//         {/* <Route path="/student" element={<StudentDashboard />} /> */}
//         {/* <Route path="/formation-player" element={<FormationPlayer />} /> */}
//         {/* <Route path="/student/library" element={<Library />} /> */}


//         <Route path="/student" element={<StudentDashboard />}>
//           <Route index element={<Dashboard />} />
//           <Route path="formation-player" element={<FormationPlayer />} />
//           <Route path="libraryr" element={<Library />} />

//         </Route>

//         {/* Professor routes (nested inside the layout) */}
//         <Route path="/professor" element={<ProfessorLayout />}>
//           <Route index element={<Dashboard />} />
//           <Route path="students" element={<ManagmentStudents />} />
//           <Route path="playlists" element={<Playlist />} />
//           <Route path="edit/:id" element={<EditPlaylist />} />
//           <Route path="playlist/videos" element={<VideoPlaylist />} />
//           <Route path="playlist/:playlistId/videos" element={<VideoPlaylist />} />


//           {/* <Route path="test/videos" element={<VideoPlaylist />} /> */}

//         </Route>
//       </Routes>
//     </Router>
//   );
// };

// export default AppRoutes;
