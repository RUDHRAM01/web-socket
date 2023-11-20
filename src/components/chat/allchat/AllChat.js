import React, { useEffect, useState } from 'react'
import Navigation from '../../navigation/Navigation'
import Title from '../../common/Title'
import MyChat from './MyChat'
import SearchUser from '../../navigation/SearchUser'
import Profile from '../../navigation/Profile'
import { getAllChats } from '../../../api/get/getAllChats'
import { useDispatch, useSelector } from 'react-redux'
import { setChatData } from '../../../reducer/Slice'


function AllChat() {
  const storeChatData = useSelector((state) => state.chatStore.data);
  const [chatData, setChat] = useState(storeChatData)
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const handleOpen = () => setOpen(true);
  let path = window.location.pathname 
  console.log("path : ",path);
  

  useEffect(() => {
    const calling = async () => {
      const { data } = await getAllChats()
      console.log(data);
      
      dispatch(setChatData(data));
      setChat(data)
    }
    calling()
  }, [dispatch])

  return (
    <div style={{ height: "94vh", backgroundColor: "black", borderRadius: "4px", padding: "8px", border: "1px solid gray" }} className='AllChat'>
      <Title title={`Let's chat`} size={'60px'} color={"white"} />
      <Profile open={open} setOpen={setOpen} />
      <hr style={{ color: "white" }} />
      <Navigation handleOpen={handleOpen} />
      <MyChat data={chatData} />
      <SearchUser />
    </div>
  )
}

export default AllChat