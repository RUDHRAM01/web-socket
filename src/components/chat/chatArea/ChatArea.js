import { Avatar, Typography, TextField, Hidden } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AiOutlineSend } from "react-icons/ai"
import MessagesContainer from './MessagesContainer'
import '../../styles.css'
import { BiArrowBack } from "react-icons/bi"


function ChatArea({ chatUserInfo }) {
  const [message, setMessage] = useState("");
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
  
  const [size, setSize] = useState({
    t: "16px",
    s: "12px"
  })

  var data = localStorage.getItem('loginInfo');
  data = JSON.parse(data);
  const value = chatUserInfo?.users[0]?._id === data?.id ? chatUserInfo?.users[1] : chatUserInfo?.users[0]
  return (
    <div style={{ backgroundColor: "white", border: "1px gray solid", borderRadius: "8px", padding: "16px" }} className='chatArea'>
      <div style={{ display: "flex", gap: "12px", alignItems: "center", color: "grayText", margin: "4px" }}>
        <Hidden mdUp>
          <div>
            <BiArrowBack onClick={() => navigate("/")} />
          </div>
        </Hidden>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}  >
          <Avatar src={value?.profilePic} alt='name' />
          <Typography variant="body1">{chatUserInfo.isLoading ? "" : value?.name}</Typography>
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