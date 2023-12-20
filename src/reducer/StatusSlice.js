import { createSlice } from "@reduxjs/toolkit";

const statusStore = createSlice({
    name: "statusStore",
    initialState: {
        allStatus: [],
    },
    reducers: {
        setAllStatus: (state, action) => {
            state.allStatus = action.payload;
        },
    },
});


export const { setAllStatus } = statusStore.actions;

export default statusStore.reducer;
