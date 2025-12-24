import React from "react";
import { Outlet } from "react-router-dom";
import Header2 from "../../components/Header/Header2";
import Footer2 from "../../components/Footer/Footer2";

const StudentLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header2 />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer2 />
    </div>
  );
};

export default StudentLayout;