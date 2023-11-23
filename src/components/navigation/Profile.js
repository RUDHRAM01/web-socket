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
import { MdOutlineEdit } from "react-icons/md";
import { AiOutlineLogout } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';



const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function Profile({ open, setOpen }) {
    var data = localStorage.getItem('loginInfo');
    data = JSON.parse(data);
    const navigate = useNavigate()

    return (
        <>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={() => setOpen(false)}
                aria-describedby="alert-dialog-slide-description"

            >
                <div style={{ backgroundColor: "black", color: "white" }}>
                    <DialogTitle style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>{"Profile"}<MdOutlineEdit /></DialogTitle>
                    <DialogContent>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "GrayText", marginBottom: "4px" }}>
                            <Avatar src={data?.profilePic} alt='user' />
                            <Typography variant="h6">{data?.name}</Typography>
                        </div>
                        <DialogContentText id="alert-dialog-slide-description" style={{ color: "GrayText" }}>
                            Email  : {data?.email}
                        </DialogContentText>
                    </DialogContent>
                    <div style={{ display: "flex", justifyContent: "center", gap: "8px", padding: "8px", alignItems: "center" }}>
                        <button style={{ display: "flex", alignItems: "center", gap: "8px" }} onClick={() => {
                            navigate("/login");
                            localStorage.removeItem('loginInfo');
                        }}>
                            <AiOutlineLogout style={{ cursor: "pointer" }} />
                            <Typography variant="h6" style={{ cursor: "pointer" }}>Logout</Typography>
                        </button>
                    </div>
                </div>

            </Dialog>
        </>
    )
}

export default Profile