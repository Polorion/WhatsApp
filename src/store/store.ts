import { configureStore } from "@reduxjs/toolkit";
import Authentication from "./AuthenticationSlice";
import { useDispatch } from "react-redux";
import ChatSlice from "./ChatSlice";

export const store = configureStore({
  reducer: {
    Authentication: Authentication,
    ChatSlice: ChatSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
