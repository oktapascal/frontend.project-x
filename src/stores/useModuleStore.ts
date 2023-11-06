import superjson from "superjson";
import { create } from "zustand";
import { PersistStorage, StorageValue, persist } from "zustand/middleware";

interface IState {
  module_id: string | null;
}

interface IActions {
  update: (data: string) => void;
  reset: () => void;
}

const initialState: IState = {
  module_id: null,
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
      update: (data) => set({ module_id: data }),
      reset: () => set(initialState),
    }),
    { name: "session-module", storage }
  )
);
