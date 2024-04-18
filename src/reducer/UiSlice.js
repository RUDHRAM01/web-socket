import { createSlice } from "@reduxjs/toolkit";

const UiStore = createSlice({
    name: "UiStore",
    initialState: {
        open: false,
        loading: false,
        statusId: "",
        isConnecting: true,
    },
    reducers: {
        setOpen(state, action) {
            state.open = action.payload;
        },
        setLoading(state, action) {
            state.loading = action.payload;
        },
        setIsConnecting(state, action) {
            state.isConnecting = action.payload;
        }
    },
});

export const { setOpen,setLoading,setIsConnecting } = UiStore.actions;

export default UiStore.reducer;
