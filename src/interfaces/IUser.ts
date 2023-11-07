interface IRole {
  flag_read: boolean | null;
  flag_insert: boolean | null;
  flag_update: boolean | null;
  flag_delete: boolean | null;
}
export interface IUser {
  user_id: string | null;
  username: string | null;
  role: IRole;
}
