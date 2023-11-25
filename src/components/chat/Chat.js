import React, { useState, useEffect } from 'react';
import { Hidden } from '@mui/material';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';
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
import ChatArea from './chatarea/ChatArea';
import AllChat from './allchat/AllChat';
import '../styles.css';
import { setNoChats } from '../../reducer/Slice';
import { updateLatestMessage } from '../../reducer/Slice';
import { Encryption } from '../Encryption';


const ENDPOINT = 'http://localhost:4000';
let socket;

const Chat = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const allChats = useSelector((state) => state.chatStore.allChats);
  const allMessages = useSelector((state) => state.chatStore.allMessages);
  const [receiveUserTyping, setReceiveUserTyping] = useState("");
  console.log(allMessages)


  const [chatData, setChat] = useState([]);
  const [socketIsConnected, setSocketIsConnected] = useState(false);
  const [currentUsersMessages, setCurrentUsersMessages] = useState([]);
  const [userIsTyping, setUserIsTyping] = useState(false);
  const [typing, setTyping] = useState(false);
  const [label, setLabel] = useState('send a message...');
  const [message, setMessage] = useState('');

  const loginUser = JSON.parse(localStorage.getItem('loginInfo'));

  const chatWithUser = allChats?.find(
    (chat) => chat?._id === id
  )?.users?.find((user) => user?._id !== loginUser?.id);


  useEffect(() => {
    if (id === 'login') return;
    dispatch(setCurrentChatUser(chatWithUser));
  }, [chatWithUser, id, dispatch]);

  useEffect(() => {
    const messages = allMessages?.find((message) => message?._id === id);
    setCurrentUsersMessages(messages?.messages);
  }, [allMessages, id, dispatch]);

  const data = JSON.parse(localStorage.getItem('loginInfo'));

  useEffect(() => {
    if (data.id) {
      socket = io(ENDPOINT);
      socket.emit('setup', data.id);
      socket.on('connected', () => {
        setSocketIsConnected(true);
      });
    }

    const createChatFun = async () => {
      if (id === 'login') return;
      try {
        const { data } = await createChat({ userId: chatWithUser?._id });
        socket.emit('join chat', data?._id);
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
  }, [id, chatWithUser?._id, dispatch]);

  const sendMessage = async encrypted  => {
    try {
      socket.emit('stop typing', id);
      setLabel('sending...');
      setMessage('');
      dispatch(
        addNewMessage({ _id: id, message: { sender: { _id: data?.id }, content: encrypted?.encryptedText,iv : encrypted?.iv } })
      );
      dispatch(updateLatestMessage({ _id: id, message: { sender: { _id: data?.id }, content: encrypted?.encryptedText, iv : encrypted?.iv} }));
      const res = await sendMessageApi({ message: encrypted?.encryptedText, chatId: id, iv : encrypted?.iv });
      socket.emit('new message', res?.data?.newMessage);
      setLabel('send a message...');

    } catch (error) {
      toast.error('error while sending message');
    }
  };

  const encryption = () => {
    if(message.length === 0) return;
    let encrypted = Encryption(message);
  
    sendMessage({encryptedText : encrypted?.encryptedText,iv : encrypted?.iv})
  }



  useEffect(() => {
    
    const handleNewMessage = async (newMessageReceived) => {
     console.log(newMessageReceived,"new message received")
      dispatch(
        addNewMessage({
          _id: newMessageReceived.chat,
          message: { sender: { _id: newMessageReceived?.sender }, content: newMessageReceived?.content, iv : newMessageReceived?.iv },
        })
      );
      dispatch(updateLatestMessage({ _id: newMessageReceived.chat, message: { sender: { _id: newMessageReceived?.sender }, content: newMessageReceived?.content, iv : newMessageReceived?.iv } }));
    };


    socket.on('message received', handleNewMessage);
  }, [dispatch, id]);

  useEffect(() => {
    if (socketIsConnected === false) return;
    socket?.on('typing', (room) => {
      setReceiveUserTyping(room);
      setUserIsTyping(true);
    });
    socket?.on('stopTy', () => {
      setUserIsTyping(false);
    });
  });

  const isTyping = () => {
    if (socketIsConnected === false) return;
    if (!typing) {
      setTyping(true);
      socket.emit('typing', id);
    }
    const lastTypingTime = new Date().getTime();
    const timerLength = 3000;
    setTimeout(() => {
      const timeNow = new Date().getTime();
      const timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength) {
        socket.emit('stopTy', id);
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
  );
};

export default Chat;
