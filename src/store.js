import { configureStore } from "@reduxjs/toolkit"
import Slice from "./reducer/Slice"
import UiSlice from "./reducer/UiSlice"
import userSlice from "./reducer/userSlice"
import statusSlice from "./reducer/StatusSlice"
import NotificationSlice from "./reducer/NotificationSlice"

const store = configureStore({
    reducer: {
        'chatStore': Slice,
        'uiStore': UiSlice,
        'userStore': userSlice,
        'statusStore': statusSlice,
        'notificationStore': NotificationSlice
    }
})

export default store