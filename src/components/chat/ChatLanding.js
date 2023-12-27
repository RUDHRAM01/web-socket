import React, { useEffect, useState } from 'react'
import AllChat from './allChatComponent/AllChat'
import NoChat from './chatAreaComponent/Nochat'
import { Hidden } from '@mui/material'
import { getAllChats } from '../../api/get/getAllChats'
import { useDispatch, useSelector } from 'react-redux'
import { setChatData, addMessage, setNoChats } from '../../reducer/Slice'
import { getMessageApi } from '../../api/get/getAllMessage'
import toast from 'react-hot-toast'


function ChatLanding() {
    const [chatData, setChat] = useState([]);
    const dispatch = useDispatch();
    const allChats = useSelector((state) => state.chatStore.allChats);
    
    
    useEffect(() => {
        if (allChats.length > 0) return;
        const calling = async () => {
            try{
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
            } catch (err) {
                toast.error(err?.response?.data?.msg)
            }
        }
        calling()
        }, [dispatch, allChats.length])
    
    
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