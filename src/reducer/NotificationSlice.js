const { createSlice } = require("@reduxjs/toolkit");

const NotificationSlice = createSlice({
    name: "NotificationSlice",
    initialState: {
        notifications: []
    },
    reducers: {
        setNotifications: (state, action) => {
            state.notifications = action.payload;
        },
        deleteNotification: (state, action) => {
            state.notifications = state.notifications.filter((notification) => notification._id !== action.payload);
        }
    }
});

export const { setNotifications, deleteNotification } = NotificationSlice.actions;

export default NotificationSlice.reducer;