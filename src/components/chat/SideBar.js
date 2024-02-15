import { Avatar } from '@mui/material';
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { GetAllUsersApi } from '../../api/get/getAllUsers';
import { setALLUsers } from '../../reducer/userSlice';
import { useNavigate } from 'react-router-dom';
import { createChat } from '../../api/post/createChat';
import { getAllChats } from '../../api/get/getAllChats';
import { setLoading } from '../../reducer/UiSlice'
import { setChatData } from '../../reducer/Slice'

function SideBar() {
    const dispatch = useDispatch();
    const loginUser = JSON.parse(localStorage.getItem('loginInfo'));
    const allUsers = useSelector((state) => state.userStore.allUsers);
    useEffect(() => {
        const calling = async () => {
            try {
                const { data } = await GetAllUsersApi()
                dispatch(setALLUsers(data))
            } catch (err) {
                console.log(err)
            }
        }
        calling()
    }, [dispatch])

    const navigate = useNavigate();
    const createChatFun = async (value) => {
        dispatch(setLoading(true));
        try {
            const { data } = await createChat({ userId: value });
            const chats = await getAllChats();
            dispatch(setChatData(chats?.data));
            dispatch(setLoading(false));
            navigate(`/chat/${data?._id}`);
        } catch (err) {
            dispatch(setLoading(false));
            console.log(err)
        }  
    }
    return (
        <div style={{ display: "flex", backgroundColor: "white", borderRadius: "8px", flexDirection: "column", alignItems: "center" }} className='sideBarMain'>
            <div style={{ display: "flex", alignItems: "center", padding: "8px", flexDirection: "column-reverse", justifyContent: "center", backgroundColor: "black", color: "white", margin: "4px", borderRadius: "8px 8px 0px 0px" }}>
                <Avatar src={loginUser?.profilePic} style={{ width: "40px", height: "40px", borderRadius: "50%" }} />
                <p style={{ fontSize: "18px", fontWeight: "600",overflowX: "scroll", whiteSpace: "nowrap", width: "100%", maxWidth:"40px",textAlign:"center"  }} className='sideBarUsername'>
                    {loginUser?.username && `@${loginUser?.username}`}
                    {!loginUser?.username && `You`}
                </p>
            </div>
            <div className='baseSideBard'>
                {allUsers?.map((data) => (

                    <div key={data._id} style={{ display: "flex", alignItems: "center", padding: "8px" }}>
                        <button onClick={() => createChatFun(data._id)}>
                            <Avatar src={data?.profilePic} alt="" style={{ width: "40px", height: "40px", borderRadius: "50%" }} />
                        </button>
                    </div>

                ))}

            </div>
        </div>
    )
}

export default SideBar