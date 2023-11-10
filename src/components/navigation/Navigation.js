import React from 'react'
import { Avatar, Button, Typography } from '@mui/material'
import { AiOutlineSearch } from "react-icons/ai"
import { setOpen } from '../../reducer/UiSlice'
import { useDispatch } from 'react-redux'


function Navigation() {
  const dispatch = useDispatch()
  
  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between",padding:"8px" }}>
        <Button onClick={()=>{dispatch(setOpen(true))}} style={{display:"flex",gap:"8px"}}>
          <AiOutlineSearch />
          <Typography variant="overline" style={{ color: "white" }}>Search...</Typography>
        </Button>
        <Avatar src='https://th.bing.com/th?id=OIP.jG20xZ4rIJfvN9q5oN2OBwHaEo&w=316&h=197&c=8&rs=1&qlt=30&o=6&dpr=1.3&pid=3.1&rm=2' alt='user' />
      </div>
    </>
  )
}

export default Navigation