import React from 'react'
// import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { useSelector } from 'react-redux';
import Avatar from '@mui/material/Avatar';
import commonData from '../../common-data/Common.json'
import Typography from '@mui/material/Typography'
import { MdOutlineEdit } from "react-icons/md";


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function Profile({ open, setOpen }) {
    const data = useSelector((state) => state.userStore.data)

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
                    <DialogTitle style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>{"Profile"}<MdOutlineEdit /></DialogTitle>
                    <DialogContent>
                        <div style={{ display:"flex" ,alignItems:"center",gap:"8px",color: "GrayText",marginBottom:"4px" }}>
                            <Avatar src={commonData[0].imageUrl} alt='user' />
                            <Typography variant="h6">{commonData[0].name}</Typography>
                        </div>
                        <DialogContentText id="alert-dialog-slide-description" style={{color:"GrayText"}}>
                            Email  : {data?.email}
                        </DialogContentText>
                    </DialogContent>
                </div>

            </Dialog>
        </>
    )
}

export default Profile