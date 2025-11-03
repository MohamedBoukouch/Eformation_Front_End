import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/professor/header/Header";
import Sidebar from "../components/SidebarProfessor";

const Layout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex flex-col min-h-screen bg-neutral-950 text-neutral-100">
      {/* Header */}
      <Header onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

      {/* Sidebar + Main content */}
      <div className="flex flex-1 overflow-hidden">
        <Sidebar isOpen={isSidebarOpen} />
        <main
          className={`flex-1  overflow-y-auto transition-all duration-300 ${
            isSidebarOpen ? "md:ml-60" : "md:ml-20"
          }`}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
