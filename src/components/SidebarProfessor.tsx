import React, { useRef, useEffect, useState,  } from "react";
import type {RefObject} from "react";
import SidebarLogo from "./Logo";


import SimpleBar from "simplebar-react";

import clsx from "clsx";
import useSidebar from "../hooks/useSidebar";
import Navmenu from "./NavMenu";
import { menuItems } from "../data/menuData";

const SidebarProfessor: React.FC = () => {
  const scrollableNodeRef = useRef<HTMLDivElement | null>(null);
  const [scroll, setScroll] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollableNodeRef.current && scrollableNodeRef.current.scrollTop > 0) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    };

    const node = scrollableNodeRef.current;
    if (node) {
      node.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (node) {
        node.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  const [collapsed, setMenuCollapsed] = useSidebar();
  const [menuHover, setMenuHover] = useState<boolean>(false);

  return (
    <div>
      <div
        className={clsx("sidebar-wrapper  bg-[#1f2937] shadow-base z-30", {
          "w-[72px] close_sidebar": collapsed,
          "w-[280px]": !collapsed,
          "sidebar-hovered": menuHover,
        })}
        onMouseEnter={() => setMenuHover(true)}
        onMouseLeave={() => setMenuHover(false)}
      >
        <SidebarLogo menuHover={menuHover} />

        <div
          className={`h-[60px] absolute top-[80px] nav-shadow z-[1] w-full transition-all duration-200 pointer-events-none ${
            scroll ? "opacity-100" : "opacity-0"
          }`}
        ></div>

        <SimpleBar
          className="sidebar-menu h-[calc(100%-80px)]"
          scrollableNodeProps={{ ref: scrollableNodeRef as RefObject<HTMLDivElement> }}
        >
          <Navmenu menus={menuItems} />
        </SimpleBar>
      </div>
    </div>
  );
};

export default SidebarProfessor;
