import React from 'react'
import { Avatar, Button, Typography } from '@mui/material'
import { AiOutlineSearch } from "react-icons/ai"
import { setOpen } from '../../reducer/UiSlice'
import { useDispatch } from 'react-redux'


function Navigation({handleOpen}) {
  const dispatch = useDispatch()
  var data = localStorage.getItem('loginInfo');
  data = JSON.parse(data);
  
  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between",padding:"8px" }}>
        <Button onClick={()=>{dispatch(setOpen(true))}} style={{display:"flex",gap:"8px"}}>
          <AiOutlineSearch />
          <Typography variant="overline" style={{ color: "white" }}>Search...</Typography>
        </Button>
        <Avatar style={{cursor:"pointer"}} src={data?.profilePic} alt='user' onClick={handleOpen} />
      </div>
    </>
  )
}

export default Navigation