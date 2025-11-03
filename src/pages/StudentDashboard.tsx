import React from "react";
import Header2 from "../components/Header/Header2";
import Footer2 from "../components/Footer/Footer2";
import StudentSection1 from "../components/Student/StudentSection1";
import StudentSection2 from "../components/Student/StudentSection2";

const StudentDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header2 />
      <StudentSection1 />
      <StudentSection2 />
      <Footer2 />
    </div>
  );
};

export default StudentDashboard;
