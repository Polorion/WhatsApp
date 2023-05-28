import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IinitialStateAuth {
  IDToken: string;
  Instance: string;
  ChatNumber: string;
}

const initialState: IinitialStateAuth = {
  ChatNumber: "9118297763",
  IDToken: "db29315ae9ae48b6810673993d67027087bb7e31443341c89f",
  Instance: "1101824136",
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
