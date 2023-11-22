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
import { getMessageApi } from '../../api/get/getAllMessage'
import { sendMessageApi } from '../../api/post/sendMessage'

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
    const [chats, setChats] = useState([]);
    const [label, setLabel] = useState("send a message...");
    const [sending, setSending] = useState(false);
    const [message, setMessage] = useState("");
    var data = localStorage.getItem('loginInfo');
    data = JSON.parse(data);
    const sendMessage = async () => {
        if (message.length === 0) return;
        try {
          setLabel("sending...")
          setChats([...chats, { content: message, sender: { _id: data?.id } }])
          const res = await sendMessageApi({ message: message, chatId: chatUserInfo?._id });
          socket.emit("new message", res?.data?.newMessage);
          setLabel("send a message...");
          setSending(true);
          setMessage("")
        } catch (error) {
          console.log(error);
        }
      }
    useEffect(() => {
        socket.on("message received", async (newMessageReceived) => {
            const { data } = await getMessageApi(chatUserInfo?._id);
            setChats(data?.messages)
        }
    )})
     

    useEffect(() => {
        if (chatUserInfo?.isLoading) return;
        const calling = async () => {
          const { data } = await getMessageApi(chatUserInfo?._id);
          setChats(data?.messages)
        }
        calling();
      }, [sending, chatUserInfo?.isLoading !== true])
  
    return (
        <div>
            <div className='chatMain' >
                <Hidden mdDown><AllChat chatData={chatData} /></Hidden>
                <ChatArea chatUserInfo={chatUserInfo} chats={chats} message={message} sendMessage={sendMessage} setMessage={setMessage} label={label} socket={socket} />
            </div>
        </div>
    )
}

export default Chat