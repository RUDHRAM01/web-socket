import React from 'react'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';



function NotificationMenu(props) {
    const navigate = useNavigate()
    return (
        <div>
            <Menu
                id="basic-menu"
                anchorEl={props?.anchorEl}
                open={props?.openMenu}
                onClose={props?.handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&::before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                {props?.notifications?.length === 0 ? <MenuItem onClick={props?.handleClose}>No new notifications</MenuItem> :<p style={{color:"orange",padding:"4px 8px",fontWeight:"600"}}>Notifications</p> }
                {props?.notifications?.map((notification) => (
                    <MenuItem onClick={() => { props?.handleClose(); navigate(`/chat/${notification?.chatId}`)}} key={notification._id}>
                        <div style={{ display: "flex", width: "100%" }}>
                        <img src={notification?.from?.profilePic} alt="profile" style={{ width: "30px", height: "30px", borderRadius: "50%", marginRight: "10px" }} />
                            <div style={{ display: "flex", alignItems: "flex-start",flexDirection:"column" }}>
                                <p style={{ fontSize: "14px", fontWeight: "bold", margin: "0px" }}>{notification?.from?.name}</p>
                                <p style={{ fontSize: "14px", margin: "0px" }}>{`new message`}</p>
                            </div>
                        </div>
                    </MenuItem>
                ))}
            </Menu>
        </div>
    )
}

export default NotificationMenu