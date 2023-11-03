import superjson from "superjson";
import { create } from "zustand";
import { PersistStorage, StorageValue, persist } from "zustand/middleware";
import { IUser } from "@/types/IUser";

interface IState extends IUser {}

interface IActions {
  update: (data: IUser) => void;
  reset: () => void;
}

const initialState: IState = {
  user_id: null,
  username: null,
  role: {
    flag_insert: false,
    flag_read: false,
    flag_update: false,
    flag_delete: false,
  },
};

const storage: PersistStorage<IState> = {
  getItem: (name: string) => {
    const data = localStorage.getItem(name);

    if (!data) return null;

    return superjson.parse(data);
  },
  setItem: (name: string, value: StorageValue<IState>) => localStorage.setItem(name, superjson.stringify(value)),
  removeItem: (name: string) => localStorage.removeItem(name),
};

export default create<IState & IActions>()(
  persist(
    (set) => ({
      ...initialState,
      update: (state: IState) => set(state),
      reset: () => set(initialState),
    }),
    { name: "session-user", storage }
  )
);
