import React from 'react'
// import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
// import { useSelector } from 'react-redux';
import Avatar from '@mui/material/Avatar';
// import commonData from '../../common-data/Common.json'
import Typography from '@mui/material/Typography'


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function ChatProfile({ open, setOpen, current }) {
    return (
        <>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={() => setOpen(false)}
                aria-describedby="alert-dialog-slide-description"

            >
                <div style={{backgroundColor:"black",color:"white"}}>
                    <DialogTitle style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>{"Profile"}</DialogTitle>
                    <DialogContent>
                        <div style={{ display:"flex" ,alignItems:"center",gap:"8px",color: "GrayText",marginBottom:"4px" }}>
                            <Avatar src={current?.profilePic} alt='user' />
                            <Typography variant="h6">{current?.name}</Typography>
                        </div>
                       {current?.email &&  <DialogContentText id="alert-dialog-slide-description" style={{color:"GrayText"}}>
                            Email  : {current?.email}
                        </DialogContentText>}
                    </DialogContent>
                </div>

            </Dialog>
        </>
    )
}

export default ChatProfile