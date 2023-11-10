import React from 'react'
import AllChat from './allchat/AllChat'
import NoChat from './chatarea/Nochat'
import { Hidden } from '@mui/material'


function ChatLanding() {
    return (
        <div>
            <div className='chatMain' style={{ display: "flex", justifyContent: "space-between", padding: "20px" }}>
                <AllChat />
                <Hidden mdDown> <NoChat /></Hidden>
            </div>
        </div>
    )
}

export default ChatLanding