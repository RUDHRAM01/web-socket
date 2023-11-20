import React from 'react'
import Typography from '@mui/material/Typography'
import { Avatar } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { setOpen } from '../../../reducer/UiSlice'
import { useDispatch } from 'react-redux'




function SingleChat({ props }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    return (
        <button style={{ width: "100%" }} onClick={() => { navigate(`/chat/${props?.users[0]?._id}`); dispatch(setOpen(false))}} key={`${props?._id}`}>
            <div style={{ display: "flex", padding: "10px", alignItems: "center", gap: "8px", backgroundColor: "Gray", margin: "2px", borderRadius: "4px" }}>
                <Avatar src={props?.users[0]?.imageUrl} alt='img' />
                <div>
                    <Typography variant="body1" style={{ color: "pink" }}>
                        {props?.users[0]?.name}
                    </Typography>
                    <Typography variant="body2" style={{ color: "white" }}>
                        {props?.users[0]?.latestMessage?.content}
                    </Typography>
                </div>
            </div>
        </button>
    )
}

export default SingleChat