import React, { useEffect, useState } from 'react'
import { Drawer, Typography, CircularProgress } from '@mui/material'
import Loader from './Loader'
import { setOpen } from '../../reducer/UiSlice'
import { useSelector, useDispatch } from 'react-redux'
import "./styles.css"
import SearchContainer from './SearchContainer'
import { AiOutlineSearch } from "react-icons/ai"
// import EndToEnd from './EndToEnd'
import '../styles.css'
import { MdCancel } from "react-icons/md"
import axios from 'axios'
import { debounce } from 'lodash';

function SearchUser() {
    const dispatch = useDispatch()
    const [chatUsers, setChatUsers] = useState([])
    const [searching, setSearching] = useState(false)
    const open = useSelector((state) => state.uiStore.open)
    const [search, setSearch] = useState("")
    var data = localStorage.getItem('loginInfo');
    data = JSON.parse(data);
    const loading = useSelector((state) => state.uiStore.loading)



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
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [data?.token])

    const searchNow = async (vl) => {
        let value = vl || ''
        const searchData = await axios.get(`http://localhost:4000/api/users/search?search=${value}`, {
            headers: {
                Authorization: `Bearer ${data?.token}`,
            }
        })
        setChatUsers(searchData?.data)
        setSearching(false)
    }

    const debouncedFetchData = debounce(searchNow, 1500);




    return (
        <>
            {loading && (
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
                    <CircularProgress />
                    <p style={{ color: "black", fontWeight: "600" }}>Creating a chat for you...</p>
                </div>

            )}
            <Drawer
                anchor="left"
                open={open}
                onClose={() => { dispatch(setOpen(false)) }}
            >
                <div style={{ height: "100vh", padding: "8px", overflow: "scroll" }} className='Drawer'>
                    <div style={{ display: "flex", gap: "20px", alignItems: "center", backgroundColor: "white", justifyContent: "space-between", padding: "8px" }}>
                        <Typography variant="h6" style={{ color: "#3498db" }} >
                            Search Contact
                        </Typography>
                        <MdCancel style={{ fontSize: "30px", cursor: "pointer" }} onClick={() => dispatch(setOpen(false))} />
                    </div>

                    <div style={{ padding: "8px", display: "flex", gap: "8px", alignItems: "center" }}>
                        <AiOutlineSearch style={{ border: "2px solid gray", height: "40px", width: "34px", borderRadius: "6px 0px 0px 6px", color: "gray", cursor: "pointer" }} onClick={searchNow} />
                        <input onChange={(e) => {
                            setSearch(e.target.value);
                            setSearching(true)
                            debouncedFetchData(e.target.value);
                        }} type="search" placeholder='search...' style={{ border: "1px solid gray", width: "100%", height: "40px", padding: "4px" }} />
                    </div>
                    <div>
                        {searching
                            ?
                            <>
                                <Loader />
                            </>
                            :
                            <SearchContainer data={chatUsers} />
                        }
                    </div>

                </div>
            </Drawer>
        </>
    )
}

export default SearchUser