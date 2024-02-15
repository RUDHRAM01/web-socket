import { createSlice } from "@reduxjs/toolkit";

const userStore = createSlice({
    name: "userStore",
    initialState: {
        isLogin: false,
        data: null,
        currentChatUser: {},
        allUsers: [],
        onlineUsers: {},
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
        setALLUsers: (state, action) => {
            state.allUsers = action.payload;
        },
        setOnlineUsers: (state, action) => {
            state.onlineUsers = action.payload;
        },
        restUser: (state, action) => {
            state.isLogin = false;
            state.data = null;
            state.currentChatUser = {};
            state.allUsers = [];
            state.onlineUsers = {};
        },
    },
});



export const { setIsLogin, setData, setCurrentChatUser,setALLUsers, setOnlineUsers,restUser } = userStore.actions;

export default userStore.reducer;
