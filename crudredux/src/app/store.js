import userDetail from "../features/userDetailSlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
    reducer:{
        app: userDetail,
    }
})