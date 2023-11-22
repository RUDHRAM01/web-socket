import React, { useState, useEffect } from 'react'
import ChatArea from './chatarea/ChatArea'
import AllChat from './allchat/AllChat'
import { Hidden } from '@mui/material'
import '../styles.css'
import { useParams } from 'react-router-dom'
import io from 'socket.io-client';
import toast from 'react-hot-toast';
import { createChat } from '../../api/post/createChat';
import { getAllChats } from '../../api/get/getAllChats'

const ENDPOINT = 'http://localhost:4000';
var socket;
function Chat() {
    const { id } = useParams();
    // const [socketConnected, setSocketConnected] = useState(false);
    const [chatUserInfo, setChatUserInfo] = useState({
        isLoading: true
    })
    const [chatData, setChat] = useState([])

    useEffect(() => {
        if (id) {
            socket = io(ENDPOINT);
            socket.emit("setup", id);
            socket.on("connection", () => {
                console.log("connected");
            });
        }

        const createChatFun = async () => {
            if (id === "login") return;
            try {
                let { data } = await createChat({ userId: id });
                setChatUserInfo(() => ({ isLoading: false, ...data }))
                socket.emit("join chat", data?._id);
                data  = await getAllChats()
                setChat(data?.data)
            } catch (error) {
                toast.error(error?.response?.data?.msg)
            }
        };
        createChatFun();
    }, [id]);


    console.log(chatUserInfo,"chatuserinfo")
    return (
        <div>
            <div className='chatMain' >
                <Hidden mdDown><AllChat chatData={chatData} /></Hidden>
                <ChatArea chatUserInfo={chatUserInfo} />
            </div>
        </div>
    )
}

export default Chat