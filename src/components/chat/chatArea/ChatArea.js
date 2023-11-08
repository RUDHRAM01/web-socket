import { Avatar, Typography, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import data from "../../../common-data/Common.json"
import { AiOutlineSend } from "react-icons/ai"
import MessagesContainer from './MessagesContainer'
function ChatArea() {
  const [message, setMessage] = useState("");
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





  return (
    <div style={{ backgroundColor: "white", border: "1px gray solid", width: "60%", borderRadius: "8px", padding: "16px" }}>
      <div style={{ display: "flex", gap: "8px", alignItems: "center", color: "grayText", margin: "4px" }}>
        <Avatar src={data[id]?.imageUrl} alt='name' />
        <Typography variant="body1">{data[id]?.name}</Typography>
      </div>
      <hr />
      
      
      <div style={{ height: "70vh", overflowY: "scroll" }}>
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
          chatValue
        </label>
        <AiOutlineSend style={{ fontSize: "20px", cursor: "pointer" }} />
      </div>
    </div>
  )
}

export default ChatArea