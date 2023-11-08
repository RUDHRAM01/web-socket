import { configureStore } from "@reduxjs/toolkit"
import Slice from "./reducer/Slice"
import UiSlice from "./reducer/UiSlice"


const store = configureStore({
    reducer: {
        'chatStore': Slice,
        'uiStore': UiSlice
    }
})

export default store