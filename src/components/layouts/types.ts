export interface MenuResponses {
  serial_number: number;
  name: string;
  path_url: string | null;
  children?: MenuResponses;
}
