import React from "react";
import { Outlet } from "react-router-dom";
import SidebarProfessor from "../components/SidebarProfessor";
import useSidebar from "../hooks/useSidebar";
import Header from "../components/professor/header/Header";

const ProfessorLayout: React.FC = () => {
  const [collapsed] = useSidebar(); // récupère l'état de la sidebar (ouverte/fermée)

  return (
    <div className="app min-h-screen flex">
      {/* Sidebar */}
  
      <SidebarProfessor />

      {/* Contenu principal */}
      <div
        className={`transition-all duration-200 flex flex-col flex-1 ${
          collapsed ? "ml-[72px]" : "ml-[280px]"
        }`}
      >
          <Header/>
        <main className="">
        
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default ProfessorLayout;
