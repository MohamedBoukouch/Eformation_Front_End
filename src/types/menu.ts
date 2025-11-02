export interface ChildMenuItem {
  childlink: string;
  childtitle: string;
  badge?: string;
  submenu?: ChildMenuItem[];
}

export interface MenuItemType {
  title: string;
  icon?: string;
  link?: string;
  isHeader?: boolean;
  child?: ChildMenuItem[];
}