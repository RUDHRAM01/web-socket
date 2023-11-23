import React, { useState, useEffect } from 'react'
import ChatArea from './chatarea/ChatArea'
import AllChat from './allchat/AllChat'
import { Hidden } from '@mui/material'
import '../styles.css'
import { useParams } from 'react-router-dom'
import io from 'socket.io-client';
import toast from 'react-hot-toast';
import { createChat } from '../../api/post/createChat';
import { sendMessageApi } from '../../api/post/sendMessage'
import { useSelector, useDispatch } from 'react-redux';
import { addNewMessage } from '../../reducer/Slice'
import { setCurrentChatUser } from '../../reducer/userSlice'
import { getAllChats } from '../../api/get/getAllChats'
import { setChatData } from '../../reducer/Slice'
import { getMessageApi } from '../../api/get/getAllMessage'
import { addMessage } from '../../reducer/Slice'
import { CircularProgress } from '@mui/material'


const ENDPOINT = 'http://localhost:4000';
var socket;
function Chat() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const allChats = useSelector((state) => state.chatStore.allChats);
    const allMessages = useSelector((state) => state.chatStore.allMessages);
    const loading = useSelector((state) => state.uiStore.loading);
    const [chatData, setChat] = useState([]);
    const [socketIsConnected, setSocketIsConnected] = useState(false);


    var loginUser = localStorage.getItem('loginInfo');
    loginUser = JSON.parse(loginUser);
    const chatWithUser = allChats?.find((chat) => chat?._id === id)?.users?.find((user) => user?._id !== loginUser?.id);

    useEffect(() => {

        if (id === "login") return;
        dispatch(setCurrentChatUser(chatWithUser));
    }, [chatWithUser, id, dispatch]);


    const [currentUsersMessages, setCurrentUsersMessages] = useState([]);

    useEffect(() => {
        const messages = allMessages?.find((message) => message?._id === id);
        setCurrentUsersMessages(messages?.messages);
    }, [allMessages, id, dispatch]);

    var data = localStorage.getItem('loginInfo');
    data = JSON.parse(data);
    const [userIsTyping, setUserIsTyping] = useState(false);
    const [typing, setTyping] = useState(false);

    useEffect(() => {
        if (data.id) {
            socket = io(ENDPOINT);
            socket.emit("setup", data.id);
            socket.on("connected", () => {
                console.log("connected to socket.io")
                setSocketIsConnected(true);
            });

        }

        const createChatFun = async () => {
            if (id === "login") return;
            try {
                var { data } = await createChat({ userId: chatWithUser?._id });
                socket.emit("join chat", data?._id);
                var res = await getAllChats();
                dispatch(setChatData(res?.data));
            } catch (error) {
                if (chatData.length === 0) {
                    return toast.success("wait for a while...");
                }
                toast.error(error?.response?.data?.msg)
            }
        };
        createChatFun();
    }, [id, chatWithUser?._id, dispatch]);

    const [label, setLabel] = useState("send a message...");

    const [message, setMessage] = useState("");

    const sendMessage = async () => {
        if (message.length === 0) return;
        try {
            
            socket.emit("stop typing", chatWithUser?._id);
            setLabel("sending...")
            var storeMess = message;
            setMessage("");
            dispatch(addNewMessage({ _id: id, message: { sender: { _id: data?.id }, content: storeMess } }));
            const res = await sendMessageApi({ message: storeMess, chatId: id });
            socket.emit("new message", res?.data?.newMessage);
            setLabel("send a message...");

        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        const handleNewMessage = (newMessageReceived) => {
            dispatch(addNewMessage({ _id: id, message: { sender: { _id: newMessageReceived?.sender }, content: newMessageReceived?.content } }));
        };

        socket.on("message received", handleNewMessage);

        // Clean up the event listener when the component unmounts
        return () => {
            socket.off("message received", handleNewMessage);
        };
    }, [dispatch, id]);

    useEffect(() => {
        if (socketIsConnected === false) return;
        socket?.on("typing", () => {
            setUserIsTyping(true);
        });
        socket?.on("stopTy", () => {
            setUserIsTyping(false);
        });
    });


    const isTyping = () => {
        if (socketIsConnected === false) return;
        if (!typing) {
            setTyping(true);
            socket.emit("typing", chatWithUser._id);
        }
        let lastTypingTime = new Date().getTime();
        let timerLength = 3000;
        setTimeout(() => {
            let timeNow = new Date().getTime();
            let timeDiff = timeNow - lastTypingTime;
            if (timeDiff >= timerLength) {
                socket.emit("stopTy", chatWithUser._id);
                setTyping(false);
            }
        }, timerLength);
    }

    // all calling ( main api calling ) ------>>

    useEffect(() => {
        if (allChats.length > 0) return;
        const calling = async () => {
            const { data } = await getAllChats()
            setChat(data)
            dispatch(setChatData(data))
            data.forEach(element => {
                const { _id } = element;
                Promise.resolve(getMessageApi(_id)).then((res) => {
                    dispatch(addMessage({ messages: res?.data?.messages, _id }));
                })
            });
        }
        calling()
    }, [dispatch, allChats.length])

    useEffect(() => {
        setChat(allChats)
    }, [allChats])

    

    return (
        <div>
            <div className='chatMain' >
                {loading && <div style={{position:"absolute",height:"100vh",width:"100%",display:"flex",alignItems:"center",justifyContent:"center"}} className='loading'>
                    <CircularProgress />
                </div>}
                <Hidden mdDown><AllChat chatData={chatData} /></Hidden>
                <ChatArea allMessages={currentUsersMessages} message={message} sendMessage={sendMessage} setMessage={setMessage} label={label} isTyping={isTyping} userIsTyping={userIsTyping} />
            </div>
        </div>
    )
}

export default Chat