import React from 'react'
import { Avatar, Button, Typography } from '@mui/material'
import { AiOutlineSearch } from "react-icons/ai"
import { setOpen } from '../../reducer/UiSlice'
import { useDispatch } from 'react-redux'
import Logo from '../../assests/logo.png'


function Navigation({ handleOpen }) {
  const dispatch = useDispatch()
  var data = localStorage.getItem('loginInfo');
  data = JSON.parse(data);

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", padding: "8px",height:"20%" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <img src={Logo} alt="logo" style={{ width: "100px" }} />
          <Avatar style={{ cursor: "pointer", border:"2px solid white" }} src={data?.profilePic} alt='user' onClick={handleOpen} />
        </div>
        <button onClick={() => { dispatch(setOpen(true)) }} style={{ display: "flex", gap: "8px", backgroundColor: "white", alignItems: "center", height: "50px" }}>
          <AiOutlineSearch style={{ marginLeft: "8px", }} />
          <p style={{}}>Search...</p>
        </button>
      </div>
    </>
  )
}

export default Navigation