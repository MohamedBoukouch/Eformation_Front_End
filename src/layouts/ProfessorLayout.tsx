// Layout.tsx
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/professor/header/Header";
import Sidebar from "../components/professor/side_bar/SidebarProfessor";

export interface LayoutContextType {
  changeSidebarMenu: (menu: any[] | null) => void;
}

const Layout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [customMenu, setCustomMenu] = useState<any[] | null>(null);

  const handleChangeSidebarMenu = (menu: any[] | null) => {
    setCustomMenu(menu);
  };

  return (
    <div className="flex flex-col min-h-screen bg-neutral-950 text-neutral-100">
      <Header onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          isOpen={isSidebarOpen}
          customMenu={customMenu}
          onBack={() => setCustomMenu(null)}
        />
        <main
          className={`flex-1 overflow-y-auto transition-all duration-300 ${
            isSidebarOpen ? "md:ml-60" : "md:ml-20"
          }`}
        >
          {/* Provide context to all child routes */}
          <Outlet context={{ changeSidebarMenu: handleChangeSidebarMenu }} />
        </main>
      </div>
    </div>
  );
};

export default Layout;
