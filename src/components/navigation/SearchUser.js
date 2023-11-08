import React from 'react'
import { Drawer, Typography } from '@mui/material'
import { setOpen } from '../../reducer/UiSlice'
import { useSelector, useDispatch } from 'react-redux'
import "./styles.css"
import MyChat from '../chat/allchat/MyChat'
import { AiOutlineSearch,AiOutlineLock } from "react-icons/ai"

function SearchUser() {
    const dispatch = useDispatch()
    const open = useSelector((state) => state.uiStore.open)

    return (
        <Drawer
            anchor="left"
            open={open}
            onClose={() => { dispatch(setOpen(false)) }}  
        >
            <div style={{ width: "30vw", height: "100vh", backgroundColor: "black", padding: "8px" }}>
                <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>

                    <Typography variant="h6" className="gradient-text">
                        Search Contact
                    </Typography>
                </div>

                <div style={{ padding: "8px", display: "flex", gap: "8px", alignItems: "center" }}>
                    <AiOutlineSearch style={{ border: "2px solid gray", height: "40px", width: "34px", borderRadius: "6px 0px 0px 6px", color: "gray" }} />
                    <input type="search" placeholder='search...' style={{ border: "1px solid gray", width: "100%", height: "40px", padding: "4px" }} />
                </div>
                <div>
                    <MyChat />
                </div>
                <div style={{ position: "absolute", bottom: "8px", overflowX: "hidden",display:'flex',gap:"4px",alignItems:"center",justifyContent:"center",width:"96%" }}>
                    <AiOutlineLock style={{color:"white"}} />
                    <Typography variant="caption" style={{color:"white"}}>
                        End to end encryption
                    </Typography>
                </div>
            </div>
        </Drawer>
    )
}

export default SearchUser