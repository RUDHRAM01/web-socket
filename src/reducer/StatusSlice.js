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
        resetStatus: (state, action) => {
            state.allStatus = [];
        }
    },
});


export const { setAllStatus,resetStatus } = statusStore.actions;

export default statusStore.reducer;
