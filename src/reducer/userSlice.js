import { createSlice } from "@reduxjs/toolkit";

const userStore = createSlice({
    name: "userStore",
    initialState: {
        isLogin: false,
        data: null,
        currentChatUser: {},
    },
    reducers: {
        setIsLogin: (state, action) => {
            state.isLogin = action.payload;
        },
        setData: (state, action) => {
            state.data = action.payload;
        },
        setCurrentChatUser: (state, action) => {
            state.currentChatUser = action.payload;
        },
        
    },
});



export const { setIsLogin, setData, setCurrentChatUser } = userStore.actions;

export default userStore.reducer;
