import React from "react";
import { Link } from "react-router-dom";

import mainLogo from "../assets/react.svg";
import useSidebar from "../hooks/useSidebar";

interface SidebarLogoProps {
  menuHover: boolean;
}

const SidebarLogo: React.FC<SidebarLogoProps> = ({ menuHover }) => {
  const [collapsed, setMenuCollapsed] = useSidebar();

  return (
    <div
      className={`logo-segment flex justify-between items-center bg-[#1f2937] z-[9] py-6 px-4 ${
        menuHover ? "logo-hovered" : ""
      }`}
    >
      <Link to="/">
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <div className="h-[40px] w-[40px] rounded-lg flex items-center justify-center">
            <img src={mainLogo} alt="Logo" />
          </div>

          {(!collapsed || menuHover) && (
            <div>
              <h1 className="text-[15px] font-extrabold text-white tracking-tight drop-shadow-sm">
                eFormation
              </h1>
            </div>
          )}
        </div>
      </Link>

      {(!collapsed || menuHover) && (
        <div
          onClick={() => setMenuCollapsed(!collapsed)}
          className={`h-4 w-4 border-[1px] border-white rounded-full transition-all duration-150 cursor-pointer ${
            collapsed
              ? ""
              : "ring-1 ring-inset ring-offset-[4px] ring-gray-900 bg-gray-900"
          }`}
        ></div>
      )}
    </div>
  );
};

export default SidebarLogo;
