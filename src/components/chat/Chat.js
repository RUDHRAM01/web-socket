import { Box, AppBar, Toolbar, Grid, Avatar } from '@mui/material';
import React from 'react';
import ChatWith from './chatWith/ChatWith';
import ChatArea from './chatArea/ChatArea';
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { ChatState } from '../../context/Context';
function Chat() {
    const [data, setData] = useState([]);
    const { user } = ChatState();
    console.log(data)
    console.log(user)

    useEffect(() => {
        axios.get('http://localhost:3000/api/chats', { headers: { Authorization: `Bearer ${user?.user?.token}` } })
            .then(res => {
                setData(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [user])  

    return (
        <div>
            <Grid container component="main">
                <Grid item xs={12} sm={6} md={4} component={Box} elevation={6} square>
                    <AppBar position="static">
                        <Toolbar>
                            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }} >
                                <img src="https://th.bing.com/th/id/OIP.-bqEbV_nqalVVwbvaYOZqgHaE8?w=256&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7" alt="" />
                            </Avatar>
                            <div style={{ display: "flex", flexGrow: 1 }}></div>
                            <i class="fas fa-bars"></i>
                        </Toolbar>
                    </AppBar>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={12} display="flex" alignItems="center">
                            <div class="input-group mb-3">
                                <span class="input-group-text" id="basic-addon1"><i class="fas fa-search" ></i></span>
                                <input type="search" class="form-control" placeholder="Contact" aria-label="Username" aria-describedby="basic-addon1" />
                            </div>
                        </Grid>
                        {data?.map((item, index) => (
                            <ChatWith chat={item} index={index} name={user?.user?.username} />
                        )) }
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={6} md={8} component={Box} elevation={6} square style={{backgroundColor:"black",height:"100vh"}}>
                    <ChatArea />
                </Grid>
            </Grid>
        </div>
    )
}

export default Chat