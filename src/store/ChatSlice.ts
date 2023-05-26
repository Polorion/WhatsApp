import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { IinitialStateAuth } from "./AuthenticationSlice";
import { convertTime } from "../Utils";
type itemMessage = {
  value: string;
  time: string;
  from: boolean;
};
interface deleteNotification {
  id: number;
  params: IinitialStateAuth;
}
interface IinitialState {
  message: itemMessage[];
}

const initialState: IinitialState = {
  message: [],
};
interface sendMessage {
  params: IinitialStateAuth;
  valueInput: string;
}
export const sendMessage = createAsyncThunk(
  "chat/deleteNotification",
  async ({ params, valueInput }: sendMessage, thunkAPI) => {
    const dispatch = thunkAPI.dispatch;
    const { data } = await axios.post(
      `https://api.green-api.com/waInstance${params.Instance}/sendMessage/${params.IDToken}
`,
      {
        chatId: "7" + params.ChatNumber + "@c.us",
        message: valueInput,
      }
    );
    await dispatch(getAllMessages(params));
  }
);

export const deleteNotification = createAsyncThunk(
  "chat/deleteNotification",
  async ({ id, params }: deleteNotification) => {
    const { data } = await axios.delete(
      `https://api.green-api.com/waInstance${params.Instance}/deleteNotification/${params.IDToken}/${id}`
    );
  }
);

export const getAllMessages = createAsyncThunk(
  "chat/getAllMessages",
  async (params: IinitialStateAuth, thunkAPI: any) => {
    const state = thunkAPI.getState();

    const { data } = await axios.get(
      `https://api.green-api.com/waInstance${params.Instance}/receiveNotification/${params.IDToken}`
    );
    const dispatch = thunkAPI.dispatch;
    const id = await data?.receiptId;
    if (id) {
      await dispatch(deleteNotification({ id, params }));
      dispatch(getAllMessages(params));
    }
    return { data: data.body, number: state.Authentication.ChatNumber };
  }
);

export const ChatSlice = createSlice({
  name: "chat",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getAllMessages.pending, (state, { payload }) => {});
    builder.addCase(getAllMessages.fulfilled, (state, { payload }) => {
      if (payload?.data.senderData?.chatId.includes(payload.number)) {
        const time = convertTime(payload.data.timestamp);
        if (payload.data?.typeWebhook === "outgoingAPIMessageReceived") {
          const value = payload.data.messageData.extendedTextMessageData?.text;
          const from = true;
          state.message = [
            ...state.message,
            {
              time,
              value,
              from,
            },
          ];
        } else if (payload.data?.typeWebhook === "incomingMessageReceived") {
          const value = payload.data.messageData.textMessageData?.textMessage;
          const from = false;
          state.message = [
            ...state.message,
            {
              time,
              value,
              from,
            },
          ];
        }
      }
    });
    builder.addCase(getAllMessages.rejected, (state, { payload }) => {});
  },
  reducers: {
    addMessage: (state, { payload }: PayloadAction<itemMessage>) => {
      state.message = [
        ...state.message,
        {
          ...payload,
        },
      ];
    },
    setChatNumber: (state, { payload }: PayloadAction<string>) => {},
    setInstance: (state, { payload }: PayloadAction<string>) => {},
  },
});

export const {} = ChatSlice.actions;

export default ChatSlice.reducer;
