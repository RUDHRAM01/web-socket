import { configureStore } from "@reduxjs/toolkit"
import Slice from "./reducer/Slice"
import UiSlice from "./reducer/UiSlice"
import userSlice from "./reducer/userSlice"




const store = configureStore({
    reducer: {
        'chatStore': Slice,
        'uiStore': UiSlice,
        'userStore': userSlice,
    }
})

export default store