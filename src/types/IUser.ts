interface IRole {
  flag_read: boolean;
  flag_insert: boolean;
  flag_update: boolean;
  flag_delete: boolean;
}
export interface IUser {
  user_id: string;
  role: IRole;
}
