import React , {useEffect, useState } from 'react'
import { Drawer, Typography } from '@mui/material'
import { setOpen } from '../../reducer/UiSlice'
import { useSelector, useDispatch } from 'react-redux'
import "./styles.css"
import SearchContainer from './SearchContainer'
import { AiOutlineSearch } from "react-icons/ai"
import EndToEnd from './EndToEnd'
import '../styles.css'
import { MdCancel } from "react-icons/md"
import axios from 'axios'

function SearchUser() {
    const dispatch = useDispatch()
    const [chatUsers, setChatUsers] = useState([])
    const open = useSelector((state) => state.uiStore.open)
    const [search, setSearch] = React.useState("")
    const data = useSelector((state) => state.userStore.data)
    console.log("calling from the search user...", chatUsers);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    'http://localhost:4000/api/users/allusers',
                    {
                        headers: {
                            Authorization: `Bearer ${data?.token}`,
                        },
                    }
                );
                setChatUsers(response?.data);
                console.log(response?.data)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        
        fetchData();
    }, [data])

    const searchNow = async () => {
        const searchData = await axios.get(`http://localhost:4000/api/users/search?search=${search}`, {
            headers: {
                Authorization: `Bearer ${data?.token}`,
            }
        })
        setChatUsers(searchData?.data)
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
                    <SearchContainer data={chatUsers} />
                </div>
               <EndToEnd />
            </div>
        </Drawer>
    )
}

export default SearchUser