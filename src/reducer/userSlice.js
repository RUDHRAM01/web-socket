import { createSlice } from "@reduxjs/toolkit";

const userStore = createSlice({
    name: "userStore",
    initialState: {
        isLogin: false,
    },
    reducers: {
        setIsLogin: (state, action) => {
            state.isLogin = action.payload;
        },
    },
});

export const { setIsLogin } = userStore.actions;

export default userStore.reducer;
