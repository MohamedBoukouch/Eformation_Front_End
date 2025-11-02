import React from "react";
import Icons from "./Icons";
import type { MenuItemType } from "../types/menu";

interface MenuItemProps {
  activeSubmenu: number | null;
  i: number;
  item: MenuItemType;
  toggleSubmenu: (index: number) => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ activeSubmenu, i, item, toggleSubmenu }) => {
  return (
    <div
      className={`menu-link ${
        activeSubmenu === i ? "parent_active not-collapsed" : "collapsed"
      }`}
      onClick={() => toggleSubmenu(i)}
    >
      <div className="flex-1 flex items-start ">
        <span className="menu-icon">
          {/* Provide a default icon or handle undefined case */}
          <Icons icon={item.icon || "ph:question"} />
        </span>
        <div className="text-box ">{item.title}</div>
      </div>

      <div className="flex-0">
        <div
          className={`menu-arrow transform transition-all duration-300 ${
            activeSubmenu === i ? "rotate-90" : ""
          }`}
        >
          <Icons icon="ph:caret-right" />
        </div>
      </div>
    </div>
  );
};

export default MenuItem;