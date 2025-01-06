import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Message {
  message: string;
  user: { id: number; userName: string };
  timestamp:string
}

export interface MessageState {
  messages: Message[];
}

const initialState: MessageState = {
  messages: [],
};

export const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    sendMessage: (state, action: PayloadAction<Message>) => {
      state.messages.unshift(action.payload); // Add the new message to the array
    },
    addMessage: (state, action: PayloadAction<Message>) => {
      state.messages.unshift(action.payload); // Use for handling server messages
    },
  },
});

export const { sendMessage, addMessage } = messageSlice.actions;
export const messageReducer = messageSlice.reducer;
