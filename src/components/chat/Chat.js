import React from 'react'
import ChatArea from './chatarea/ChatArea'
import AllChat from './allchat/AllChat'

function Chat() {
    return (
        <div>
            <div className='chatMain' style={{ display: "flex", justifyContent: "space-between", padding: "20px" }}>
                <AllChat />
                <ChatArea />
            </div>
        </div>
    )
}

export default Chat