import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IinitialStateAuth {
  IDToken: string;
  Instance: string;
  ChatNumber: string;
}

const initialState: IinitialStateAuth = {
  ChatNumber: "",
  IDToken: "",
  Instance: "",
};

export const Authentication = createSlice({
  name: "filter",
  initialState,

  reducers: {
    setToken: (state, { payload }: PayloadAction<string>) => {
      state.IDToken = payload;
    },
    setChatNumber: (state, { payload }: PayloadAction<string>) => {
      state.ChatNumber = payload;
    },
    setInstance: (state, { payload }: PayloadAction<string>) => {
      state.Instance = payload;
    },
  },
});

export const { setToken, setChatNumber, setInstance } = Authentication.actions;

export default Authentication.reducer;
