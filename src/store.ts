import { configureStore } from "@reduxjs/toolkit";
import { messageReducer } from "./features/messageSlice";

export const store = configureStore({
    reducer:{
        message:messageReducer
    }
})

export type ApplicationState = ReturnType<typeof store.getState>
export type ApplicationDispatch = typeof store.dispatch
