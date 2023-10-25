import { create } from "zustand";
import { persist, createJSONStorage, devtools } from "zustand/middleware";
import { IUser } from "@/types";

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

const useUserStore = create<IState & IActions>()(
  devtools(
    persist(
      (set) => ({
        ...initialState,
        update: (state: IState) => set(state),
        reset: () => {
          set(initialState);
        },
      }),
      {
        name: "session-user",
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
);

export default useUserStore;
