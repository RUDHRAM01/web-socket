import { createSlice } from "@reduxjs/toolkit";

const UiStore = createSlice({
    name: "UiStore",
    initialState: {
        open: false,
    },
    reducers: {
        setOpen(state, action) {
            state.open = action.payload;
        }
    },
});

export const { setOpen } = UiStore.actions;

export default UiStore.reducer;
