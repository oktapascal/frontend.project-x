import { create } from "zustand";

interface IState {
  key: string | number | null;
}

interface IActions {
  update: (data: string | number) => void;
}

const initialState: IState = {
  key: null,
};

export default create<IState & IActions>()((set) => ({
  ...initialState,
  update: (data: string | number) => set({ key: data }),
}));
