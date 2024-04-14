import React, { useState, useEffect } from 'react';
import { Hidden } from '@mui/material';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { createChat } from '../../api/post/createChat';
import { getAllChats } from '../../api/get/getAllChats';
import { getMessageApi } from '../../api/get/getAllMessage';
import { sendMessageApi } from '../../api/post/sendMessage';
import {
  useSelector,
  useDispatch
} from 'react-redux';
import {
  addNewMessage,
  setChatData,
  addMessage,
} from '../../reducer/Slice';
import { setCurrentChatUser } from '../../reducer/userSlice';
import ChatArea from './chatAreaComponent/ChatArea';
import AllChat from './allChatComponent/AllChat';
import '../styles.css';
import { setNoChats } from '../../reducer/Slice';
import { updateLatestMessage } from '../../reducer/Slice';
import { Encryption } from '../Encryption';
import { getAllNotification } from '../../api/get/getAllNotification';
import { setNotifications } from '../../reducer/NotificationSlice';
import { seenNotification } from "./SeenNotification"
import SideBar from './SideBar';

// socket
import io from 'socket.io-client';
const ENDPOINT = process.env.REACT_APP_SOCKET;
let socket;

let currentDate = new Date();
let formattedDate = new Date(currentDate.toISOString().slice(0, -1)).toISOString();



const Chat = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [socketIsConnected, setSocketIsConnected] = useState(false);
  const allChats = useSelector((state) => state.chatStore.allChats);
  const allMessages = useSelector((state) => state.chatStore.allMessages);
  const [receiveUserTyping, setReceiveUserTyping] = useState("");
  const [chatData, setChat] = useState([]);
  const [currentUsersMessages, setCurrentUsersMessages] = useState([]);
  const [userIsTyping, setUserIsTyping] = useState(false);
  const [typing, setTyping] = useState(false);
  const [label, setLabel] = useState('send a message...');
  const [message, setMessage] = useState('');
  const loginUser = JSON.parse(localStorage.getItem('loginInfo'));
  const data = JSON.parse(localStorage.getItem('loginInfo'));

    // getting the notifications
    useEffect(() => {
      const handleNotification = async () => {
        socket?.on("notification received", async () => {
          try {
            const { data } = await getAllNotification();
            if (window.navigator.vibrate) {
              window.navigator.vibrate([30, 20, 20])
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
    }, [dispatch]);

  const chatWithUser = allChats?.find(
    (chat) => chat?._id === id
  )?.users?.find((user) => user?._id !== loginUser?.id);
  
  if (chatWithUser === undefined) {
    const calling = async () => {
      const { data } = await getAllChats();
      setChat(data);
      dispatch(setChatData(data));
      data.forEach((element) => {
        const { _id } = element;
        Promise.resolve(getMessageApi(_id)).then((res) => {
          dispatch(addMessage({ messages: res?.data?.messages, _id }));
        });
      });
    };
    calling();
  }

  useEffect(() => {
    if (socketIsConnected === true) return;
    if(data?.id === undefined) return;
    socket = io(ENDPOINT, { 
      withCredentials: true,
     });
    socket.emit("add", data?.id);
    socket.on("connected", () => {
      setSocketIsConnected(true);
    });
  }, [data?.id, dispatch, socketIsConnected]);

  useEffect(() => {
    if(data?.id === undefined) return;
    socket?.emit("updateCurrent", {
      chatId: id,
      userId: data?.id,
    });
    const calling = async () => {
      try {
        await seenNotification({ for: data?.id, from: chatWithUser?._id })
      } catch (Err) {
        console.log(Err);
      }
    }
    calling();
  }, [data?.id, id, dispatch, chatWithUser?._id]);




  useEffect(() => {
    if (id === 'login') return;
    dispatch(setCurrentChatUser(chatWithUser));
  }, [chatWithUser, id, dispatch]);

  useEffect(() => {
    const messages = allMessages?.find((message) => message?._id === id);
    setCurrentUsersMessages(messages?.messages);
  }, [allMessages, id, dispatch]);


  useEffect(() => {
    const createChatFun = async () => {
      if (id === 'login') return;
      if (chatWithUser?._id === undefined) return;
      try {
        await createChat({ userId: chatWithUser?._id });
        const res = await getAllChats();
        dispatch(setNoChats(false));
        dispatch(setChatData(res?.data));
      } catch (error) {
        if (chatData.length === 0) {
          return toast.success('wait for a while...');
        }
        toast.error(error?.response?.data?.msg);
      }
    };
    createChatFun();
  }, [id, chatWithUser?._id, dispatch, chatData.length, data.id, socketIsConnected]);


  const sendMessage = async encrypted => {
    if (socketIsConnected === false) return;
    if (message.length === 0) return;
    if (encrypted?.encryptedText === undefined) return;
    if (encrypted?.iv === undefined) return;

    try {
      socket.emit('receive notification', { to: chatWithUser?._id, from: data?.id, chat: id })
      socket.emit('stop typing', { room: id, to: chatWithUser?._id });
      setLabel('sending...');
      setMessage('');
      dispatch(
        addNewMessage({ _id: id, message: { sender: { _id: data?.id }, content: encrypted?.encryptedText, iv: encrypted?.iv, createdAt: formattedDate } })
      );
      dispatch(updateLatestMessage({ _id: id, message: { sender: { _id: data?.id }, content: encrypted?.encryptedText, iv: encrypted?.iv } }));
      const res = await sendMessageApi({ message: encrypted?.encryptedText, chatId: id, iv: encrypted?.iv });
      socket.emit('new message', res?.data?.newMessage);
      setLabel('send a message...');

    } catch (error) {
      toast.error('error while sending message');
    }
  };

  const encryption = () => {
    if (message.length === 0) return;
    let encrypted = Encryption(message);
    sendMessage({ encryptedText: encrypted?.encryptedText, iv: encrypted?.iv })
  }

  useEffect(() => {
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

    socket.on('message received', handleNewMessage);
    return () => {
      socket.off('message received', handleNewMessage);
    };
  }, [dispatch, id]);


  useEffect(() => {
    if (socketIsConnected === false) return;
    socket.on('typing', (room) => {
      setReceiveUserTyping(room);
      setUserIsTyping(true);
    });
    socket.on('stopTy', () => {
      setUserIsTyping(false);
    });
  });

  const isTyping = () => {
    if (socketIsConnected === false) return;
    if (!typing) {
      setTyping(true);
      socket.emit('typing', { room: id, to: chatWithUser?._id });
    }
    const lastTypingTime = new Date().getTime();
    const timerLength = 3000;
    setTimeout(() => {
      const timeNow = new Date().getTime();
      const timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength) {
        socket.emit('stopTy', { room: id, to: chatWithUser?._id });
        setTyping(false);
      }
    }, timerLength);
  };


  useEffect(() => {
    if (allChats.length > 0) return;
    const calling = async () => {
      const { data } = await getAllChats();
      setChat(data);
      dispatch(setChatData(data));
      data.forEach((element) => {
        const { _id } = element;
        Promise.resolve(getMessageApi(_id)).then((res) => {
          dispatch(addMessage({ messages: res?.data?.messages, _id }));
        });
      });
    };
    calling();
  }, [dispatch, allChats.length]);



  return (
    <div>
      <div className='chatParentComp'>
        <Hidden mdDown>
          <div >
            <SideBar />
          </div>
        </Hidden>
        <div className="chatMain">
          <Hidden mdDown>
            <AllChat chatData={allChats} />
          </Hidden>
          <ChatArea
            allMessages={currentUsersMessages}
            message={message}
            sendMessage={encryption}
            setMessage={setMessage}
            label={label}
            isTyping={isTyping}
            userIsTyping={userIsTyping}
            receiveUserTyping={receiveUserTyping}
          />
        </div>
      </div>
    </div>
  );
};

export default Chat;
