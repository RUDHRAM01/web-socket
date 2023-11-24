import React, { useEffect, useState } from 'react'
import AllChat from './allchat/AllChat'
import NoChat from './chatarea/Nochat'
import { Hidden } from '@mui/material'
import { getAllChats } from '../../api/get/getAllChats'
import { useDispatch, useSelector } from 'react-redux'
import { setChatData, addMessage, setNoChats } from '../../reducer/Slice'
import { getMessageApi } from '../../api/get/getAllMessage'





function ChatLanding() {
    const [chatData, setChat] = useState([]);
    const dispatch = useDispatch();
    const allChats = useSelector((state) => state.chatStore.allChats);
    
    
    useEffect(() => {
        if (allChats.length > 0) return;
        const calling = async () => {
            const { data } = await getAllChats()
            if (data.length === 0) {
                dispatch(setNoChats(true))
            } else {
                dispatch(setNoChats(false))
            }
            setChat(data)
            dispatch(setChatData(data))
            data.forEach(element => {
                const { _id } = element;
                Promise.resolve(getMessageApi( _id )).then((res) => {
                    dispatch(addMessage({ messages: res?.data?.messages, _id }));
                })
            });
        }
        calling()
    }, [dispatch,allChats.length])
    
    useEffect(() => {
        setChat(allChats)
    }, [allChats])

    return (
        <div>
            <div className='chatMain' >
                <AllChat chatData={chatData} />
                <Hidden mdDown> <NoChat /></Hidden>
            </div>
        </div>
    )
}

export default ChatLanding