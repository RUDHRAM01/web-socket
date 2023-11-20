import { createSlice } from "@reduxjs/toolkit";

const userStore = createSlice({
    name: "userStore",
    initialState: {
        isLogin: false,
        data : null
    },
    reducers: {
        setIsLogin: (state, action) => {
            state.isLogin = action.payload;
        },
        setData: (state, action) => {
            state.data = action.payload;
        },
    },
});



export const { setIsLogin, setData } = userStore.actions;

export default userStore.reducer;
