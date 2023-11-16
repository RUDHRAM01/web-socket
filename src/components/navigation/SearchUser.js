import React from 'react'
import { Drawer, Typography } from '@mui/material'
import { setOpen } from '../../reducer/UiSlice'
import { useSelector, useDispatch } from 'react-redux'
import "./styles.css"
import MyChat from '../chat/allchat/MyChat'
import { AiOutlineSearch } from "react-icons/ai"
import EndToEnd from './EndToEnd'
import '../styles.css'
import { MdCancel } from "react-icons/md"
import axios from 'axios'

function SearchUser() {
    const dispatch = useDispatch()
    const open = useSelector((state) => state.uiStore.open)
    const [search, setSearch] = React.useState("")

    const searchNow = async () => {
        const data = await axios.get(`http://localhost:4000/api/users/allusers?search=${search}`)
        console.log(data); 
    }

    return (
        <Drawer
            anchor="left"
            open={open}
            onClose={() => { dispatch(setOpen(false)) }}  
        >
            <div style={{ height: "100vh", backgroundColor: "black", padding: "8px" }} className='Drawer'>
                <div style={{ display: "flex", gap: "20px", alignItems: "center",backgroundColor:"gray",justifyContent:"space-between",padding:"8px" }}>

                    <Typography variant="h6" className="gradient-text">
                        Search Contact
                    </Typography>
                   
                    <MdCancel style={{fontSize:"30px"}} onClick={()=>dispatch(setOpen(false))}/>
                </div>

                <div style={{ padding: "8px", display: "flex", gap: "8px", alignItems: "center" }}>
                    <AiOutlineSearch style={{ border: "2px solid gray", height: "40px", width: "34px", borderRadius: "6px 0px 0px 6px", color: "gray",cursor:"pointer" }} onClick={searchNow}/>
                    <input onChange={(e)=>setSearch(e.target.value)} type="search" placeholder='search...' style={{ border: "1px solid gray", width: "100%", height: "40px", padding: "4px" }} />
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