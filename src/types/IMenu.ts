export interface IMenu {
  name: string;
  path_url: string | null;
  serial_number: number;
  children: IMenu[];
}

export interface IMenuParent extends Pick<IMenu, "serial_number" | "name" | "path_url"> {}

export interface IMenuChild extends Pick<IMenu, "serial_number" | "name" | "path_url"> {
  parent_id: number;
}
