import { createSlice } from "@reduxjs/toolkit";

const chatStore = createSlice({
    name: "chatStore",
    initialState: {
        isCreateGroup: false,
        allChats: [],
        allMessages: [],
        NoChats : false,
    },
    reducers: {
        setNoChats: (state, action) => {
            state.NoChats = action.payload;
        },
        setIsCreateGroup: (state, action) => {
            state.isCreateGroup = action.payload;
        },
        setChatData: (state, action) => {
            state.allChats = action.payload;
        },
        addMessage: (state, action) => {
            state.allMessages = [...state.allMessages, action.payload];
        },
        
        addNewMessage: (state, action) => {
            let { _id, message } = action.payload;
            
            // Find the index of the chat in state.allMessages
            const chatIndex = state.allMessages.findIndex((chat) => chat._id === _id);
          
            if (chatIndex >= 0) {
              // If the chat exists, append the new message to its messages array
              state.allMessages[chatIndex].messages.push(message);
            } else {
              // If the chat doesn't exist, add a new chat object with the message
              state.allMessages.push({ _id: _id, messages: [message] });
            }
        },
       updateLatestMessage: (state, action) => {
            const { _id, message } = action.payload;
            const chatIndex = state.allChats.findIndex((chat) => chat._id === _id);
            state.allChats[chatIndex].latestMessage = message;
        },
    },
});

export const { setIsCreateGroup,setChatData,addMessage,addNewMessage,setNoChats,updateLatestMessage } = chatStore.actions;

export default chatStore.reducer;
