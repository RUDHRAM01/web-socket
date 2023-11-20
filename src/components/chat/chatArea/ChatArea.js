import { Avatar, Typography, TextField, Hidden } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AiOutlineSend } from "react-icons/ai"
import MessagesContainer from './MessagesContainer'
import '../../styles.css'
import { BiArrowBack } from "react-icons/bi"
import io from 'socket.io-client';
import { useDispatch, useSelector } from 'react-redux'
import { createChat } from '../../../api/post/createChat'
import { setChatData } from '../../../reducer/Slice';
import { getAllChats } from '../../../api/get/getAllChats'


const ENDPOINT = 'http://localhost:4000';
var socket;

function ChatArea() {
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const [chatUserInfo, setChatUserInfo] = useState({
    isLoading : true
  })
  const [socketConnected, setSocketConnected] = useState(false)
  const navigate = useNavigate()
  const [chats, setChats] = useState([
    {
      mess: "Hello",
    },
    {
      mess: "Hi",
    },
    {
      mess: "How are you?",
    },
    {
      mess: "I am fine, what about you?"
    },
    {
      mess: "I am also fine"
    }
  ]);
  const { id } = useParams()
  const [size, setSize] = useState({
    t: "16px",
    s: "12px"
  })


  useEffect(() => {
    if (id) {
      socket = io(ENDPOINT);
      socket.emit("setup", id);
      socket.on("connection", () => {
        setSocketConnected(true)
      });
    }

    const createChatFun = async () => {
      if (id === "login") return;
      const { data } = await createChat({ userId: id });
      setChatUserInfo(() => ({ isLoading : false, ...data }))
     

      try {

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    createChatFun();

  }, [id]);

  console.log("chatArea calling", chatUserInfo)
  return (
    <div style={{ backgroundColor: "white", border: "1px gray solid", borderRadius: "8px", padding: "16px" }} className='chatArea'>
      <div style={{ display: "flex", gap: "12px", alignItems: "center", color: "grayText", margin: "4px" }}>
        <Hidden mdUp>
          <div>
            <BiArrowBack onClick={() => navigate("/")} />
          </div>
        </Hidden>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}  >
          <Avatar src={""} alt='name' />
          <Typography variant="body1">{chatUserInfo.isLoading ? "" : chatUserInfo?.users[0]?.name}</Typography>
        </div>
      </div>
      <hr />
      <div style={{ height: "76vh", overflowY: "scroll" }}>
        {chats.map((chat, i) => {
          return (
            <MessagesContainer mess={chat.mess} i={i} />
          )
        })}
      </div>

      <div style={{ position: 'relative', top: "6px", display: "flex", gap: "8px", alignItems: "center" }}>
        <TextField
          id="chatValue"
          label=""
          value={message}
          onChange={(e) => { setMessage(e.target.value); if (e.target.value.length > 0) setSize({ t: "6px", s: "10px" }); else setSize({ t: "16px", s: "12px" }) }}
          fullWidth
          variant="outlined"
          onClick={() => { setSize({ t: "6px", s: "10px" }) }}
          // on enter message send
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              setChats([...chats, { mess: message }])
              setMessage("")
            }
          }}
          InputProps={{
            style: {
              fontSize: '12px', // You can adjust the font size as needed
            },
          }}
        />

        <label
          htmlFor="chatValue"
          style={{
            position: 'absolute',
            top: size?.t, // Adjust the positioning as needed
            left: '10px', // Adjust the positioning as needed
            fontSize: size?.s, // You can adjust the font size as needed
            background: 'white', // You can change the background color as needed
            padding: '0 4px', // Adjust padding as needed
          }}
        >
          send a message...
        </label>
        <AiOutlineSend style={{ fontSize: "20px", cursor: "pointer" }} />
      </div>
    </div>
  )
}

export default ChatArea