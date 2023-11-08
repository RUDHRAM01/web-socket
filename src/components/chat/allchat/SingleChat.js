import React from 'react'
import Typography from '@mui/material/Typography'
import { Avatar } from '@mui/material'
import { useNavigate } from 'react-router-dom'


function SingleChat({ props }) {
    const navigate = useNavigate()
    
    return (
        <button style={{ width: "100%" }} onClick={() => navigate(`/${props?.id}`)} key={`${props?.id}`}>
            <div style={{ display: "flex", padding: "10px", alignItems: "center", gap: "8px", backgroundColor: "Gray", margin: "2px", borderRadius: "4px" }}>
                <Avatar src={props?.imageUrl} alt='img' />
                <div>
                    <Typography variant="body1" style={{ color: "pink" }}>
                        {props?.name}
                    </Typography>
                    <Typography variant="body2" style={{ color: "white" }}>
                        {props?.message}
                    </Typography>
                </div>
            </div>
        </button>
    )
}

export default SingleChat