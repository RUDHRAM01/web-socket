import React from 'react'
import { Avatar } from '@mui/material'
import { AiOutlineSearch } from "react-icons/ai"
import { setOpen } from '../../reducer/UiSlice'
import { useDispatch } from 'react-redux'
import Logo from '../../assests/logo.png'
// import Status from "../../assests/status.jpg"
import { FaCircleDot } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom'


function Navigation({ handleOpen }) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  var data = localStorage.getItem('loginInfo');
  data = JSON.parse(data);

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", padding: "8px", height: "20%" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <img src={Logo} alt="logo" style={{ width: "100px" }} />
          <div style={{ display: "flex", gap: "8px", alignItems: "center", justifyContent: "center", flexWrap: "wrap" }}>
            <FaCircleDot
              style={{
                fontSize: "30px",
                color: "black",
                border: "1px solid white",
                borderRadius: "50%",
                cursor: "pointer",
                background: "linear-gradient(to right, #d4a3ff, #a3d4ff)"
              }}
              onClick={() => navigate(`/status/createStatus`)}
            />
            <Avatar style={{ cursor: "pointer", border: "2px solid white" }} src={data?.profilePic} alt='user' onClick={handleOpen} />
          </div>
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