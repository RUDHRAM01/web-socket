import { createSlice } from "@reduxjs/toolkit";

const chatStore = createSlice({
    name: "chatStore",
    initialState: {
        isCreateGroup: false,
        data : []
    },
    reducers: {
        setIsCreateGroup: (state, action) => {
            state.isCreateGroup = action.payload;
        },
        setChatData: (state, action) => {
            state.data = action.payload;
        },
    },
});

export const { setIsCreateGroup,setChatData } = chatStore.actions;

export default chatStore.reducer;
