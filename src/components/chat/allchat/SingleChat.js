import React from 'react'
import Typography from '@mui/material/Typography'
import { Avatar } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { setOpen } from '../../../reducer/UiSlice'
import { useDispatch } from 'react-redux'

function SingleChat({ props }) {
    var data = localStorage.getItem('loginInfo');
    data = JSON.parse(data);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const value = props?.users[0]?._id === data?.id ? props?.users[1] : props?.users[0]
    
    return (
        <button style={{ width: "100%" }} onClick={() => { navigate(`/chat/${value?._id}`); dispatch(setOpen(false))}} key={`${value?._id}`}>
            <div style={{ display: "flex", padding: "10px", alignItems: "center", gap: "8px", backgroundColor: "Gray", margin: "2px", borderRadius: "4px" }}>
                <Avatar src={value?.profilePic} alt='img' />
                <div>
                    <Typography variant="body1" style={{ color: "pink" }}>
                        {value?.name}
                    </Typography>
                    <Typography variant="body2" style={{ color: "white" }}>
                        {value?.latestMessage?.content}
                    </Typography>
                </div>
            </div>
        </button>
    )
}

export default SingleChat