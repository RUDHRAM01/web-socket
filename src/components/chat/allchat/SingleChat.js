import React, { useEffect } from 'react'
import Typography from '@mui/material/Typography'
import { Avatar } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { setOpen } from '../../../reducer/UiSlice'
import { useDispatch } from 'react-redux'

function SingleChat({ props }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    var data = localStorage.getItem('loginInfo');
    data = JSON.parse(data);

    const chatWithUser = props?.users?.find((user) => user?._id !== data?.id);


    return (
        <button style={{ width: "100%" }} onClick={() => { navigate(`/chat/${props?._id}`); dispatch(setOpen(false)) }} key={`${props?._id}`}>
            <div style={{ display: "flex", padding: "10px", alignItems: "center", gap: "8px", margin: "2px" }} className='chatUserCard'>
                <Avatar src={chatWithUser?.profilePic} alt='img' />
                <div style={{ display: "flex", flexDirection: "column", width: "100%", alignItems: "flex-start" }}>
                    <Typography variant="body1" style={{ color: "black", fontSize: "16px", fontWeight: "600",textOverflow: "ellipsis",maxWidth:"85%", whiteSpace: "nowrap",overflow: "hidden" }}>
                        {chatWithUser?.name}
                    </Typography>
                    <Typography variant="body2" style={{ color: "#3498db", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",maxWidth:"50%" }}>
                        {props?.latestMessage?.content}
                    </Typography>
                </div>
            </div>
        </button>
    )
}

export default SingleChat