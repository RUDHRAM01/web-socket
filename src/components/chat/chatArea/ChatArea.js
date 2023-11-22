import { Avatar, Typography, TextField, Hidden } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AiOutlineSend } from "react-icons/ai"
import MessagesContainer from './MessagesContainer'
import '../../styles.css'
import { BiArrowBack } from "react-icons/bi"



function ChatArea(props) {
  var data = localStorage.getItem('loginInfo');
  data = JSON.parse(data);
  const navigate = useNavigate()
  
  const [size, setSize] = useState({
    t: "16px",
    s: "12px"
  })


  let value;  
 
  if (!props?.chatUserInfo?.isLoading) value = props?.chatUserInfo?.users[0]?._id === data?.id ? props?.chatUserInfo?.users[1] : props?.chatUserInfo?.users[0];
  return (
    <div style={{ backgroundColor: "white", }} className='chatArea'>
      <div style={{ display: "flex", gap: "12px", alignItems: "center", color: "grayText", padding: "4px" }} className='chatAreaOne'>
        <Hidden mdUp>
          <div>
            <BiArrowBack onClick={() => navigate("/")} />
          </div>
        </Hidden>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}  >
          <Avatar src={value?.profilePic} alt='name' />
          <Typography variant="body1">{props?.chatUserInfo.isLoading ? "" : value?.name}</Typography>
        </div>
      </div>
      <hr />
      <div style={{ overflowY: "scroll" }} className='chatAreaTwo'>
        {props?.chats.map((item, i) => {
          return (
            <MessagesContainer item={item} key={i} currentUser={data?.id} />
          )
        })}
      </div>

      <div style={{ position: 'relative', display: "flex", gap: "8px", alignItems: "center", padding: "8px" }} className='chatAreaThree'>
        <TextField
          id="chatValue"
          label=""
          value={props?.message}
          onChange={(e) => { props?.setMessage(e.target.value); if (e.target.value.length > 0) setSize({ t: "8px", s: "10px" }); else setSize({ t: "16px", s: "12px" }) }}
          fullWidth
          variant="outlined"
          onClick={() => { setSize({ t: "8px", s: "10px" }) }}
          // on enter message send
          onKeyPress={(e) => {
            if (e.key === 'Enter')
            props?.sendMessage();
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
          {props?.label}
        </label>
        <AiOutlineSend style={{ fontSize: "20px", cursor: "pointer" }} onClick={() => props?.sendMessage()} />
      </div>
    </div>
  )
}

export default ChatArea