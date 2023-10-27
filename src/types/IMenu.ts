export interface IMenu {
  name: string;
  path_url: string;
  menu_icon: string;
  serial_number: number;
  children: IMenu[];
}

export interface IMenuParent extends IMenu {}

export interface IMenuChild extends Pick<IMenu, "serial_number" | "name" | "path_url" | "menu_icon"> {}
