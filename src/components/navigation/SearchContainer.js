import React from 'react'
import { Avatar, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setOpen } from '../../reducer/UiSlice'
import { createChat } from '../../api/post/createChat'
import { getAllChats } from '../../api/get/getAllChats'
import { setChatData } from '../../reducer/Slice'
import { setLoading } from '../../reducer/UiSlice'



const SingleContainer = ({ props }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const createChatFun = async () => {
    dispatch(setOpen(false));
    dispatch(setLoading(true));
    const { data } = await createChat({ userId: props?._id });
    const chats = await getAllChats();
    dispatch(setChatData(chats?.data));
    dispatch(setLoading(false));
    navigate(`/chat/${data?._id}`);
  }
  return (
    <button style={{ width: "100%" }} onClick={()=>{createChatFun()}} key={`${props?._id}`}>
      <div style={{ display: "flex", padding: "10px", alignItems: "center", gap: "8px", backgroundColor: "white", margin: "2px", borderRadius: "4px" }}>
        <Avatar src={props?.profilePic} alt='img' />
        <div>
          <Typography variant="body1" style={{color:"#3498db"}} >
            {props?.name}
          </Typography>
          <Typography variant="body2" style={{ color: "" }}>
            {props?.latestMessage?.content}
          </Typography>
        </div>
      </div>
    </button>
  )
}
function SearchContainer({ data }) {
  return (
    <div>
      {data.map((item) => <SingleContainer key={item?._id} props={item} />)}  
    </div>
  )
}

export default SearchContainer