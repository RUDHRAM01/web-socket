import React, { useState } from 'react'
import Navigation from '../../navigation/Navigation'
// import Title from '../../common/Title'
import MyChat from './MyChat'
import SearchUser from '../../navigation/SearchUser'
import Profile from '../../navigation/Profile'
import { CircularProgress } from '@mui/material'



function AllChat({ chatData }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);

  return (
    <div style={{ padding: "8px" }} className='AllChat'>
      {/* <Title title={`Let's chat`} size={'60px'} color={"white"} /> */}
      <Profile open={open} setOpen={setOpen} />
      <hr style={{ color: "white" }} />
      <Navigation handleOpen={handleOpen} />
      {chatData?.length > 0 ?
        <>
          <MyChat data={chatData} />
        </> :
        <>
          <div style={{ display: "flex", flexDirection: "column", height: "80%", gap: "8px", alignItems: "center", justifyContent: "center" }}>
            <CircularProgress />
          </div>
        </>
      }
      <SearchUser />
    </div>

  )
}

export default AllChat