import React, { useState } from "react";

import { NavLink,  } from "react-router-dom";
import { Collapse } from "react-collapse";
import type { NavLinkProps } from "react-router-dom";


import Multilevel from "./Multilevel";
import Icons from "./Icons";

// --- Types ---
interface SubChild {
  childlink: string;
  childtitle: string;
  badge?: string;
  submenu?: SubChild[];
}

interface MenuItemType {
  title: string;
  link?: string;
  isHeader?: boolean;
  child?: SubChild[];
}

interface SubmenuProps {
  activeSubmenu: number | null;
  item: MenuItemType;
  i: number;
}

interface LockLinkProps extends Pick<NavLinkProps, "to" | "children"> {
  subItem: SubChild;
}

// --- Component ---
const Submenu: React.FC<SubmenuProps> = ({ activeSubmenu, item, i }) => {
  const [activeMultiMenu, setMultiMenu] = useState<number | null>(null);

  const toggleMultiMenu = (j: number) => {
    setMultiMenu(activeMultiMenu === j ? null : j);
  };

  const LockLink: React.FC<LockLinkProps> = ({ to, children, subItem }) => {
    if (subItem.badge) {
      return (
        <span className="text-sm flex space-x-3 items-center transition-all duration-150 cursor-not-allowed">
          <span className="bg-gray-600 h-2 w-2 rounded-full border inline-block flex-none"></span>
          <div className="flex-1 text-gray-600/50">
            {subItem.childtitle}
            <span className="badge bg-cyan-500/10 text-cyan-500 py-1 ltr:ml-2 rtl:mr-2 rounded-full">
              {subItem.badge}
            </span>
          </div>
        </span>
      );
    }
    return <NavLink to={to}>{children}</NavLink>;
  };

  return (
    <Collapse isOpened={activeSubmenu === i}>
      <ul className="sub-menu space-y-[14px] pl-8 pr-6">
        {item.child?.map((subItem, j) => (
          <li
            key={j}
            className="block relative first:pt-3 last:pb-3 capitalize"
          >
            {subItem.submenu ? (
              <div>
                <div
                  className="has-multilevel-menu text-sm flex space-x-3 items-center transition-all duration-150 cursor-pointer"
                  onClick={() => toggleMultiMenu(j)}
                >
                  <span className="flex-none h-2 w-2 rounded-full border inline-block bg-gray-600"></span>
                  <span className="flex-1 text-gray-600">
                    {subItem.childtitle} 
                  </span>
                  <span className="flex-none">
                    <span
                      className={`menu-arrow transform transition-all duration-300 ${
                        activeMultiMenu === j ? "rotate-90" : ""
                      }`}
                    >
                      <Icons icon="ph:caret-right" />
                    </span>
                  </span>
                </div>
                <Multilevel
                  activeMultiMenu={activeMultiMenu}
                  j={j}
                  subItem={subItem}
                />
              </div>
            ) : (
              <LockLink to={subItem.childlink} subItem={subItem}>
                {({ isActive }) => (
                  <div>
                    <div
                      className={`${
                        isActive ? "text-indigo-500" : "text-gray-600"
                      } text-sm flex space-x-3 items-center transition-all duration-150`}
                    >
                      <span
                        className={`${
                          isActive ? "bg-indigo-500" : "bg-gray-600"
                        } h-2 w-2 rounded-full border inline-block flex-none`}
                      ></span>
                      <span className="flex-1">
                        {subItem.childtitle}{" "}
                        {subItem.badge && (
                          <span className="badge bg-yellow-500/10 text-yellow-500 py-1 ltr:ml-2 rtl:mr-2 rounded-full">
                            {subItem.badge}
                            {".."}
                          </span>
                        )}
                      </span>
                    </div>
                  </div>
                )}
              </LockLink>
            )}
          </li>
        ))}
      </ul>
    </Collapse>
  );
};

export default Submenu;
