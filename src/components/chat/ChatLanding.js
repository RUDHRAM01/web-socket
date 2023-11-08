import React from 'react'
import AllChat from './allchat/AllChat'
import Nochat from './chatarea/Nochat'


function ChatLanding() {
    return (
        <div>
            <div className='chatMain' style={{ display: "flex", justifyContent: "space-between", padding: "20px" }}>
                <AllChat />
                <Nochat />
            </div>
        </div>
    )
}

export default ChatLanding