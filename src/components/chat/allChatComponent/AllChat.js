import React, { useState } from 'react'
import Navigation from '../../navigation/Navigation'
// import Title from '../../common/Title'
import MyChat from './MyChat'
import SearchUser from '../../navigation/SearchUser'
import Profile from '../../navigation/Profile'

function AllChat({ chatData }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
 

  return (
    <div style={{ padding: "8px" }} className='AllChat'>
      {/* <Title title={`Let's chat`} size={'60px'} color={"white"} /> */}
      <Profile open={open} setOpen={setOpen} />
      <hr style={{ color: "white" }} />
      <Navigation handleOpen={handleOpen} />
      <MyChat data={chatData} />
      <SearchUser />
    </div>

  )
}

export default AllChat