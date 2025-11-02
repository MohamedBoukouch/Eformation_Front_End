import React from "react";
import { Collapse } from "react-collapse";
import { NavLink } from "react-router-dom";
import type { NavLinkProps } from "react-router-dom";

// --- Types ---
export interface SubChild {
  childtitle: string;
  childlink: string;
  badge?: string;
  submenu?: SubChild[];
}

interface MultilevelProps {
  activeMultiMenu: number | null;
  j: number;
  subItem: SubChild; // <- utilise le même type que Submenu
}

// --- Component ---
const Multilevel: React.FC<MultilevelProps> = ({ activeMultiMenu, j, subItem }) => {
  return (
    <Collapse isOpened={activeMultiMenu === j}>
      <ul className="space-y-[14px] pl-5">
        {subItem.submenu?.map((item, i) => (
          <li key={i} className="first:pt-[14px]">
            <NavLink to={item.childlink}>
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
                      } h-1.5 w-1.5 rounded-full border inline-block flex-none`}
                    ></span>
                    <span className="flex-1">{item.childtitle}</span>
                  </div>
                </div>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </Collapse>
  );
};

export default Multilevel;
