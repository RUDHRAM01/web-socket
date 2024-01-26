import React from 'react'
import { Avatar } from '@mui/material'
import { AiOutlineSearch } from "react-icons/ai"
import { setOpen } from '../../reducer/UiSlice'
import { useDispatch, useSelector } from 'react-redux'
import Logo from '../../assests/logo.png'
import { IoNotificationsCircleSharp } from "react-icons/io5";
// import Status from "../../assests/status.jpg"
import { FaCircleDot } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom'
import NotificationMenu from './NotificationMenu'



function Navigation({ handleOpen }) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const notifications = useSelector((state) => state.notificationStore.notifications);
  var data = localStorage.getItem('loginInfo');
  data = JSON.parse(data);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", padding: "8px", height: "20%" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <img src={Logo} alt="logo" style={{ width: "100px" }} />
          <div style={{ display: "flex", gap: "8px", alignItems: "center", justifyContent: "center", flexWrap: "wrap" }}>
            <button className='notificationIcon' data-value={notifications?.length} onClick={handleClick}>
              <IoNotificationsCircleSharp
                style={{
                  height: "30px",
                  width: "30px",
                  backgroundColor: "white",
                  borderRadius: "50%",
                }}
              />
            </button>
            <NotificationMenu anchorEl={anchorEl} openMenu={openMenu} handleClose={handleClose} notifications={notifications} />
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