import React, { useEffect, useState } from 'react'
import AllChat from './allChatComponent/AllChat'
import NoChat from './chatAreaComponent/Nochat'
import { Hidden } from '@mui/material'
import { getAllChats } from '../../api/get/getAllChats'
import { useDispatch, useSelector } from 'react-redux'
import { setChatData, addMessage, setNoChats } from '../../reducer/Slice'
import { getMessageApi } from '../../api/get/getAllMessage'
import toast from 'react-hot-toast'
import SideBar from './SideBar'
import { setALLUsers } from '../../reducer/userSlice'
import { GetAllUsersApi } from '../../api/get/getAllUsers'
import { getAllNotification } from '../../api/get/getAllNotification'
import { addNewMessage, updateLatestMessage } from '../../reducer/Slice'
import { setNotifications } from '../../reducer/NotificationSlice'

// socket
import io from 'socket.io-client';
const ENDPOINT = process.env.REACT_APP_SOCKET;

let currentDate = new Date();
let formattedDate = new Date(currentDate.toISOString().slice(0, -1)).toISOString();
const socket = io(ENDPOINT);

function ChatLanding() {
    const [chatData, setChat] = useState([]);
    const dispatch = useDispatch();
    const allChats = useSelector((state) => state.chatStore.allChats);
    const data = JSON.parse(localStorage.getItem('loginInfo'));
    const [socketConnected, setSocketConnected] = useState(false);
    // connecting the user to socket
    useEffect(() => {
        socket?.emit("disconnectCurr", data?.id);
    }, [data?.id]);

    useEffect(() => {
        if (socketConnected === true) return;
        socket?.emit("add", data?.id);
        socket?.on("connected", () => {
            setSocketConnected(true);
        });
        const handleNewMessage = async (newMessageReceived) => {
            dispatch(
                addNewMessage({
                    _id: newMessageReceived.chat,
                    message: { sender: { _id: newMessageReceived?.sender }, content: newMessageReceived?.content, iv: newMessageReceived?.iv, createdAt: formattedDate },
                })
            );
            dispatch(updateLatestMessage({ _id: newMessageReceived.chat, message: { sender: { _id: newMessageReceived?.sender }, content: newMessageReceived?.content, iv: newMessageReceived?.iv } }));
            if (window.navigator.vibrate) {
                window.navigator.vibrate([30, 20, 20])
            }
        };

        socket?.on('message received', handleNewMessage);


    }, [data?.id, dispatch, socketConnected])

    // getting the notifications
    useEffect(() => {
        const handleNotification = async () => {

            socket?.on("notification received", async () => {
                try {
                    const { data } = await getAllNotification();
                    if (window.navigator.vibrate) {
                        window.navigator.vibrate([30, 20, 20]);
                    }
                    return dispatch(setNotifications(data));
                } catch (err) {
                    return toast.error(err?.response?.data?.msg);
                }
            });

            const { data } = await getAllNotification();
            dispatch(setNotifications(data));
        }
        handleNotification();
    }, [dispatch])




    useEffect(() => {
        if (allChats.length > 0) return;
        const calling = async () => {
            try {
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
                    Promise.resolve(getMessageApi(_id)).then((res) => {
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


    useEffect(() => {
        const calling = async () => {
            try {
                const { data } = await GetAllUsersApi()
                dispatch(setALLUsers(data))
            } catch (err) {
                console.log(err)
            }
        }
        calling()
    }, [dispatch])



    return (
        <div>
            <div className='chatParentComp'>
                <Hidden mdDown>
                    <div >
                        <SideBar />
                    </div>
                </Hidden>
                <div className='chatMain' >
                    <AllChat chatData={chatData} />
                    <Hidden mdDown> <NoChat /></Hidden>
                </div>
            </div>
        </div>
    )
}

export default ChatLanding