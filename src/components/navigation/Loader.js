import React from 'react'
import { Skeleton, Avatar, Card } from '@mui/material'

function Loader() {
    return (
        <Card style={{
            padding: "8px",
            display: "flex",
            gap: "8px",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            marginBottom: "8px",
            borderRadius: "8px",
            boxShadow: "0 0 5px 0px #0000001f"
        
        }}>
            
                <Skeleton variant="circular">
                    <Avatar />
                </Skeleton>
                <Skeleton variant="text" style={{ width: "100%" }} />

          

        </Card>
    )
}

export default Loader