import React from 'react'
import { Drawer, Typography } from '@mui/material'
import { setOpen } from '../../reducer/UiSlice'
import { useSelector, useDispatch } from 'react-redux'
import "./styles.css"
import MyChat from '../chat/allchat/MyChat'
import { AiOutlineSearch } from "react-icons/ai"
import EndToEnd from './EndToEnd'
import '../styles.css'

function SearchUser() {
    const dispatch = useDispatch()
    const open = useSelector((state) => state.uiStore.open)

    return (
        <Drawer
            anchor="left"
            open={open}
            onClose={() => { dispatch(setOpen(false)) }}  
        >
            <div style={{ height: "100vh", backgroundColor: "black", padding: "8px" }} className='Drawer'>
                <div style={{ display: "flex", gap: "20px", alignItems: "center",backgroundColor:"gray",justifyContent:"center" }}>

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
               <EndToEnd />
            </div>
        </Drawer>
    )
}

export default SearchUser