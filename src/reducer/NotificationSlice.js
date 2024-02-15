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
        },
        resetNotifications: (state, action) => {
            state.notifications = [];
        }
    }
});

export const { setNotifications, deleteNotification,resetNotifications } = NotificationSlice.actions;

export default NotificationSlice.reducer;