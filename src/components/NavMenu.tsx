import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import MenuItem from "./MenuItem";
import Submenu from "./SubMenu";
import SingleMenu from "./SingleMenu";

interface ChildMenuItem {
  childlink: string;
  childtitle: string;
  isActive?: boolean;
}

interface MenuItemType {
  title: string;
  link?: string;
  icon?: string;
  isHeader?: boolean;
  child?: ChildMenuItem[];
}

interface NavmenuProps {
  menus: MenuItemType[];
}

const Navmenu: React.FC<NavmenuProps> = ({ menus }) => {
  const [activeSubmenu, setActiveSubmenu] = useState<number | null>(null);

  const toggleSubmenu = (i: number) => {
    if (activeSubmenu === i) {
      setActiveSubmenu(null);
    } else {
      setActiveSubmenu(i);
    }
  };

  const location = useLocation();
  const locationPath = location.pathname;

  const normalize = (p?: string) => {
    if (!p) return "";
    return p.startsWith("/") ? p : `/${p}`;
  };

  useEffect(() => {
    let submenuIndex: number | null = null;

    menus.forEach((item, i) => {
      if (!item.child) return;

      if (item.link === locationPath) {
        submenuIndex = null;
      } else {
        const ciIndex = item.child.findIndex((ci) => normalize(ci.childlink) === locationPath);
        if (ciIndex !== -1) {
          submenuIndex = i;
        }
      }
    });

    const displayName = locationPath === "/" ? "Dashboard" : locationPath.replace("/", "");
    document.title = `eFormation | ${displayName}`;
    setActiveSubmenu(submenuIndex);
  }, [location, menus, locationPath]);

  return (
    <ul>
      {menus.map((item, i) => (
        <li
          key={i}
          className={`single-menu-item 
            ${item.child ? "item-has-children" : ""}
            ${activeSubmenu === i ? "open" : ""}
            ${locationPath === item.link ? "menu-item-active" : ""}`}
        >
          {/* Single menu with no children */}
          {!item.child && !item.isHeader && item.link && (
            <SingleMenu item={{ ...item, link: item.link }} />
          )}

          {/* Menu section header */}
          {item.isHeader && !item.child && (
            <div className="menu-label">{item.title}</div>
          )}

          {/* Menu with children */}
          {item.child && (
            <MenuItem
              activeSubmenu={activeSubmenu}
              item={item}
              i={i}
              toggleSubmenu={toggleSubmenu}
            />
          )}

          <Submenu activeSubmenu={activeSubmenu} item={item} i={i} />
        </li>
      ))}
    </ul>
  );
};

export default Navmenu;