import React, { useContext } from "react";
import Header2 from "../../components/Header/Header2";
import Footer2 from "../../components/Footer/Footer2";
import StudentSection1 from "../../components/Student/StudentSection1";
import StudentSection2 from "../../components/Student/StudentSection2";
import { AuthContext } from "../../context/AuthContext";
import { Outlet } from "react-router-dom";

const StudentDashboard: React.FC = () => {
  const auth = useContext(AuthContext);

  if (!auth) throw new Error("AuthContext is undefined");

  const id = auth.user?.id;

  if (id === undefined) {
    return <p>Loading user...</p>;
  }

  // Si nous sommes sur une route enfant, afficher Outlet
  const location = window.location.pathname;
  const isFormationRoute = location.includes('/student/formation/');

  return (
    <>
      {!isFormationRoute ? (
        <>
          <StudentSection1 />
          <StudentSection2 studentId={id} />
        </>
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default StudentDashboard;