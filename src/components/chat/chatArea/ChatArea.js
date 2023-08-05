import React from 'react'
import Logo from '../../../assests/yoo.png'
import Typography from '@mui/material/Typography'
function ChatArea() {
    return (
        <>
            <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
                width: "100%",
                flexDirection: "column",
                gap:"5px"
            }}>
                <img src={Logo} alt="ok" width="100%" height="40%" style={{maxWidth:"400px"}}/>
                <Typography variant="h6" style={{ color: "white" }}>
                Anonymous Chat
                </Typography>
            </div>
        </>
    )
}

export default ChatArea