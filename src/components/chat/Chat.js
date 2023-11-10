import React from 'react'
import ChatArea from './chatarea/ChatArea'
import AllChat from './allchat/AllChat'
import { Hidden } from '@mui/material'
import '../styles.css'

function Chat() {
    return (
        <div>
            <div className='chatMain' style={{ display: "flex", justifyContent: "space-between", padding: "20px",backgroundColor:"black",height:"100vh" }}>
                <Hidden mdDown><AllChat /></Hidden>
                <ChatArea />
            </div>
        </div>
    )
}

export default Chat