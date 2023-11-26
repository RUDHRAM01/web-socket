import { Avatar, Typography, TextField, Hidden } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AiOutlineSend } from "react-icons/ai"
import MessagesContainer from './MessagesContainer'
import '../../styles.css'
import { BiArrowBack } from "react-icons/bi"
import { useSelector } from 'react-redux'
import typingImg from "../../../assests/typingImg.gif"
import { FaLink } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useRef } from 'react'
import ChatProfile from '../../navigation/ChatProfile'


function ChatArea(props) {
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const currentChatUser = useSelector((state) => state.userStore.currentChatUser);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [props.allMessages]);


  const [isCopied, setIsCopied] = useState(false);
  var data = localStorage.getItem('loginInfo');
  data = JSON.parse(data);
  const navigate = useNavigate()

  const [size, setSize] = useState({
    t: "16px",
    s: "12px"
  })

  const handleCopyToClipboard = () => {

    const linkText = window.location.href;
    navigator.clipboard.writeText(linkText)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 1500);
      })
      .catch((err) => console.error('Unable to copy to clipboard', err));
  };

  return (
    <div style={{ backgroundColor: "white", }} className='chatArea'>
      <div style={{ display: "flex", gap: "12px", alignItems: "center", color: "grayText", padding: "4px" }} className='chatAreaOne'>
        <Hidden mdUp>
          <div>
            <BiArrowBack onClick={() => navigate("/")} style={{ cursor: "pointer" }} />
          </div>
        </Hidden>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "50%" }}  >
          <Avatar src={currentChatUser?.profilePic} alt='name' />
          <Typography variant="body1" >{currentChatUser?.name}</Typography>
        </div>
        <div style={{ flexGrow: "1" }}></div>
        <button onClick={() => handleCopyToClipboard()}>
          <div style={{ backgroundColor: "white", padding: "8px", boxShadow: "0px px 2px 0px gray", border: "1px solid gray", borderRadius: "50%" }}>
            <FaLink />
          </div>
        </button>
        <button onClick={() => setOpen(!open)}>
          <div style={{ backgroundColor: "white", padding: "8px", boxShadow: "0px px 2px 0px gray", border: "1px solid gray", borderRadius: "50%" }}>
            <BsThreeDotsVertical />
            <ChatProfile open={open} setOpen={setOpen} current={currentChatUser} />
          </div>
        </button>
        {isCopied && <div className="popup"> <FaLink /> Copied to clipboard!</div>}
      </div>

      <hr />
      <div style={{ overflowY: "scroll" }} className='chatAreaTwo' ref={chatContainerRef}>
        {props?.allMessages?.map((item, i) => (
          <MessagesContainer item={item} key={i} currentUser={data?.id} />
        ))}
        {props?.userIsTyping && id === props?.receiveUserTyping && (
          <div style={{ display: "flex", justifyContent: `flex-start` }}>
            <img src={typingImg} alt="" style={{ height: "40px" }} />
          </div>
        )}
      </div>

      <div style={{ position: 'relative', display: "flex", gap: "8px", alignItems: "center", padding: "8px" }} className='chatAreaThree'>
        <TextField
          id="chatValue"
          label=""
          value={props?.message}
          onChange={(e) => { props?.isTyping(); props?.setMessage(e.target.value); if (e.target.value.length > 0) setSize({ t: "8px", s: "10px" }); else setSize({ t: "16px", s: "12px" }) }}
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
        <button>
          <AiOutlineSend style={{ fontSize: "20px", cursor: "pointer" }} onClick={() => props?.sendMessage()} />
        </button>
      </div>
    </div>
  )
}

export default ChatArea