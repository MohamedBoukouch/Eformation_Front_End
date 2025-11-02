import React from "react";
import { Link } from "react-router-dom";
import Icons from "./Icons";

// Update this interface to match your MenuItemType
interface SingleMenuItem {
  title: string;
  link?: string; // Make this optional
  icon?: string;

}

interface SingleMenuProps {
  item: SingleMenuItem;
}

const SingleMenu: React.FC<SingleMenuProps> = ({ item }) => {
  // If item has a link, use react-router Link so navigation works in SPA
  if (item.link) {
    return (
      <Link to={item.link} className={`menu-link cursor-pointer`}>
        <div className="flex-1 flex items-center gap-3">
          <span className="menu-icon">
            <Icons icon={item.icon || "ph:question"} />
          </span>
          <div className={`text-box text-gra ${  "text-white"}`} >{item.title}</div>
        </div>
      </Link>
    );
  }

  // No link: render disabled-looking div
  return (
    <div className={`menu-link opacity-50 cursor-not-allowed`}>
      <div className="flex-1 flex items-center gap-3">
        <span className="menu-icon">
          <Icons icon={item.icon || "ph:question"} />
        </span>
        <div className="text-box">{item.title}</div>
      </div>
    </div>
  );
};

export default SingleMenu;