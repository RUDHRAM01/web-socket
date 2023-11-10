import React from 'react'
import { AiOutlineLock } from "react-icons/ai"
import {Typography } from '@mui/material'

function EndToEnd() {
    return (
        <div style={{ position: "absolute", bottom: "8px", overflowX: "hidden", display: 'flex', gap: "4px", alignItems: "center", justifyContent: "center", width: "96%" }}>
            <AiOutlineLock style={{ color: "white" }} />
            <Typography variant="caption" style={{ color: "white" }}>
                End to end encryption
            </Typography>
        </div>
    )
}

export default EndToEnd