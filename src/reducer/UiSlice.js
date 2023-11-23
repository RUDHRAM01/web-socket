import { createSlice } from "@reduxjs/toolkit";

const UiStore = createSlice({
    name: "UiStore",
    initialState: {
        open: false,
        loading:false
    },
    reducers: {
        setOpen(state, action) {
            state.open = action.payload;
        },
        setLoading(state, action) {
            state.loading = action.payload;
        },
    },
});

export const { setOpen,setLoading } = UiStore.actions;

export default UiStore.reducer;
