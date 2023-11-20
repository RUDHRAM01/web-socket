import React, { useEffect, useState } from 'react'
import AllChat from './allchat/AllChat'
import NoChat from './chatarea/Nochat'
import { Hidden } from '@mui/material'
import { getAllChats } from '../../api/get/getAllChats'
import { useDispatch } from 'react-redux'

function ChatLanding() {
    const dispatch = useDispatch();
    const [chatData, setChat] = useState([])
    useEffect(() => {
        const calling = async () => {
            const { data } = await getAllChats()
            setChat(data)
        }
        calling()
    }, [dispatch])


    return (
        <div>
            <div className='chatMain' style={{ display: "flex", justifyContent: "space-between", padding: "20px" }}>
                <AllChat chatData={chatData} />
                <Hidden mdDown> <NoChat /></Hidden>
            </div>
        </div>
    )
}

export default ChatLanding