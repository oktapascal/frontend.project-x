import { create } from "zustand";
import { devtools, persist, createJSONStorage } from "zustand/middleware";

interface IState {
  module_id: string | null;
}

interface IActions {
  update: (data: IState) => void;
  reset: () => void;
}

const initialState: IState = {
  module_id: null,
};

const useModuleStore = create<IState & IActions>()(
  devtools(
    persist(
      (set) => ({
        ...initialState,
        update: (state: IState) => set(state),
        reset: () => set(initialState),
      }),
      {
        name: "session-module",
        storage: createJSONStorage(() => localStorage),
      }
    ),
    { enabled: true }
  )
);

export default useModuleStore;
