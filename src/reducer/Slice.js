import { createSlice } from "@reduxjs/toolkit";

const chatStore = createSlice({
    name: "chatStore",
    initialState: {
        isCreateGroup: false,
    },
    reducers: {
        setIsCreateGroup: (state, action) => {
            state.isCreateGroup = action.payload;
        },
    },
});

export const { setIsCreateGroup } = chatStore.actions;

export default chatStore.reducer;
