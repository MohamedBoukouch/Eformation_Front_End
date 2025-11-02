// --- Types ---

import type { MenuItemType } from "../types/menu";




// --- Menu Items ---
export const menuItems: MenuItemType[] = [
  {
    isHeader: true,
    title: "menu",
  },
  {
    title: "Dashboard",
    icon: "ph:house",
    link: "/professor",
  },
  {
    isHeader: true,
    title: "apps",
  },
  {
    title: "Students",
    icon: "mdi:account-tie-woman",
    link: "/professor/students",
  },
  {
    title: "Playlist",
    icon: "ph:list-checks",
    link: "/professor/playlists",
  },
  {
    title: "test",
    icon: "mdi:box-variant-add",
    link: "/offers",
  },
  {
    title: "test",
    icon: "mdi:map-marker-radius-outline",
    link: "/map",
  },
  {
    isHeader: true,
    title: "User",
  },
  {
    title: "Profile",
    icon: "ph:user",
    link: "/profile",
  },
];
