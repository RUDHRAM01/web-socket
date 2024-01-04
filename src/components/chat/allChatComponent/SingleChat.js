import React from 'react'
import Typography from '@mui/material/Typography'
import { Avatar } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { setOpen } from '../../../reducer/UiSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Decryption } from '../../Decryption'
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';


const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        backgroundColor: '#44b700',
        color: '#44b700',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: 'ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""',
        },
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.8)',
            opacity: 1,
        },
        '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
        },
    },
}));

function SingleChat({ props }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const onlineUsers = useSelector((state) => state.userStore.onlineUsers);
    var data = localStorage.getItem('loginInfo');
    data = JSON.parse(data);

    const chatWithUser = props?.users?.find((user) => user?._id !== data?.id);
    let message = ""


    if (props?.latestMessage?.content) {
        message = Decryption(props?.latestMessage?.content, props?.latestMessage?.iv)
    }


    return (
        <button style={{ width: "100%" }} onClick={() => { navigate(`/chat/${props?._id}`); dispatch(setOpen(false)) }} key={`${props?._id}`}>
            <div style={{ display: "flex", padding: "10px", alignItems: "center", gap: "8px", margin: "2px" }} className='chatUserCard'>
                {onlineUsers[chatWithUser?._id] ? <StyledBadge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    variant="dot"
                >
                    <Avatar src={chatWithUser?.profilePic} alt='img' />
                </StyledBadge> :
                    <Avatar src={chatWithUser?.profilePic} alt='img' />
                }
                <div style={{ display: "flex", flexDirection: "column", width: "100%", alignItems: "flex-start" }}>
                    <Typography variant="body1" style={{ color: "black", fontSize: "16px", fontWeight: "600", textOverflow: "ellipsis", maxWidth: "85%", whiteSpace: "nowrap", overflow: "hidden" }}>
                        {chatWithUser?.name}
                    </Typography>
                    <Typography variant="body2" style={{ color: "#3498db", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "50%" }}>
                        {message}
                    </Typography>
                </div>
            </div>
        </button>
    )
}

export default SingleChat