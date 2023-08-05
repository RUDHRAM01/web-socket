import React from 'react'
import { Grid, Avatar, Typography, List, ListItem, ListItemAvatar, ListItemText, Divider } from '@mui/material'
function ChatWith({chat,index,name}) {
    

    return (
            <Grid item xs={12} md={12}>
                <List xs={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }} id={index}>
                    <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                        </ListItemAvatar>
                        <ListItemText
                            primary={chat?.isGroupChat === true ? chat?.chatName : chat?.users?.filter(item => item.username !== name)[0]?.username}
                            secondary={
                                <React.Fragment>
                                    <Typography
                                        sx={{ display: 'inline' }}
                                        component="span"
                                        variant="body2"
                                        color="text.primary"
                                    >
                                        Ali Connors
                                    </Typography>
                                    {" — I'll be in your neighborhood doing errands this…"}
                                </React.Fragment>
                            }
                        />
                    </ListItem>
                <Divider variant="inset" component="li" />
                </List>
            </Grid>
    )
}

export default ChatWith