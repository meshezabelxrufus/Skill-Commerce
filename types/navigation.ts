export interface NavLink {
  label: string;
  href: string;
}

export interface ServiceDropdownItem extends NavLink {
  iconName: string;
  description: string;
}
