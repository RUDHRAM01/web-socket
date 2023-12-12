import React, { useState } from 'react'
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
import { setChatData } from '../../reducer/Slice';
import { setCurrentChatUser } from '../../reducer/userSlice';
import { addMessage } from '../../reducer/Slice';
import { useDispatch } from 'react-redux';
import { Button, ButtonBase } from '@mui/material';
import { UploadImageApi } from '../../api/post/UploadImg';
import toast from 'react-hot-toast';
import CircularProgress from '@mui/material/CircularProgress';
import { UpdateNameApi } from '../../api/post/EditName';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function Profile({ open, setOpen }) {
    const dispatch = useDispatch();
    const [isEditMode, setIsEditMode] = useState(false);
    const [userImg, setUserImg] = useState(null);
    const [loading, setLoading] = useState(false);
    var data = localStorage.getItem('loginInfo');
    data = JSON.parse(data);
    const [name, setName] = useState(data?.name);
    const navigate = useNavigate()
    const handleLogout = () => {
        dispatch(setChatData([]));
        dispatch(setCurrentChatUser({}));
        dispatch(addMessage([]));
        localStorage.removeItem('loginInfo');
        navigate('/login')
    }

    const uploadImg = async (e) => {
        const file = e.target.files[0];
        const form = new FormData();
        form.append('img', file);
        setLoading(true);
        try {
            const res = await UploadImageApi(form);
            setUserImg(res?.data?.profilePic);
            console.log(res)
            var data = localStorage.getItem('loginInfo');
            data = JSON.parse(data);
            const info = {
                ...data,
                profilePic: res.data.profilePic
            };
            localStorage.setItem('loginInfo', JSON.stringify(info));
            setLoading(false);
            toast.success('Image uploaded successfully');
        } catch (err) {
            setLoading(false);
            toast.error(err?.response?.data?.msg);
        }
    };

    const [updateLoading, setUpdateLoading] = useState(false);
    const updateProfileFun = async () => {
        try {
            var data = localStorage.getItem('loginInfo');
            data = JSON.parse(data);
            if (name === '') return toast.error('Name is required');
            if (name === data?.name) {
                setIsEditMode(false);
                return;
            }
            setUpdateLoading(true);
            await UpdateNameApi({name : name});
            const info = {
                ...data,
                name: name
            };
            localStorage.setItem('loginInfo', JSON.stringify(info));
            setUpdateLoading(false);
            setIsEditMode(false);
            toast.success('Name updated successfully');
        } catch (err) {
            setUpdateLoading(false);
            toast.error('something went wrong');
        }
    }

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
                    <DialogTitle style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>{isEditMode ? <p>Edit Profile</p> : <p>Profile</p>}{
                        isEditMode ? <><div style={{ display: "flex", gap: "4px", alignItems: "center", justifyContent: "center" }}><Button variant='outlined' style={{ cursor: "pointer", color: "white" }} onClick={() => updateProfileFun()} >
                        {updateLoading ? <CircularProgress
                            style={{
                                color: 'white',
                            }}
                        /> : `Update`
                        }</Button></div></> : <MdOutlineEdit style={{ cursor: "pointer" }} onClick={() => setIsEditMode(true)} />
                    }</DialogTitle>
                    <DialogContent>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "GrayText", marginBottom: "4px" }}>
                            <ButtonBase
                                htmlFor={isEditMode ? "user-photo" : ``}
                                component="label"
                                style={{ borderRadius: '100%' }}
                                inputProps={{
                                    accept: 'image/*',
                                }}
                            >
                                <Avatar
                                    src={userImg ? userImg : data?.profilePic}
                                    alt='user'
                                    style={{ border: "2px solid white" }}
                                />
                                {loading && (
                                    <CircularProgress
                                        style={{
                                            position: 'absolute',
                                            color: '#3498db',
                                        }}
                                    />
                                )}
                            </ButtonBase>
                            <Typography variant="h6">
                                {isEditMode ? <input type='text' value={name} onChange={(e) => setName(e.target.value)} /> : data?.name}
                            </Typography>
                            <input
                                id="user-photo"
                                type="file"
                                style={{ display: 'none' }}
                                inputProps={{
                                    accept: 'image/*',
                                }}
                                accept='image/*'
                                onChange={uploadImg}
                            />
                        </div>
                        <DialogContentText id="alert-dialog-slide-description" style={{ color: "GrayText" }}>
                            Email  : {data?.email}
                        </DialogContentText>
                    </DialogContent>
                    <div style={{ display: "flex", justifyContent: "center", gap: "8px", padding: "8px", alignItems: "center" }}>
                        <button style={{ display: "flex", alignItems: "center", gap: "8px" }} onClick={() => handleLogout()}>
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