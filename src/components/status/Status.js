import React, { useEffect, useState } from 'react'
import AllChat from '../chat/allChatComponent/AllChat'
import { useDispatch, useSelector } from 'react-redux'
import AllStatus from './AllStatus';
import { addMessage, setChatData, setNoChats } from '../../reducer/Slice';
import { getAllChats } from '../../api/get/getAllChats';
import { getMessageApi } from '../../api/get/getAllMessage';
import { CircularProgress, Hidden } from '@mui/material';
import { getStatusApi } from '../../api/get/getStatusApi';
import { setAllStatus } from '../../reducer/StatusSlice';
import toast from 'react-hot-toast';




function Status() {
    const [chatData, setChat] = useState([]);
    const [statusData, setStatusData] = useState([]);
    const dispatch = useDispatch();
    const allChats = useSelector((state) => state.chatStore.allChats);
    const allStatus = useSelector((state) => state.statusStore.allStatus);
    const [loading, setLoading] = useState(false);
    const [componentLoading, setComponentLoading] = useState(true);

    useEffect(() => {
        if (allChats.length > 0) return;
        const calling = async () => {
            const { data } = await getAllChats()
            if (data.length === 0) {
                dispatch(setNoChats(true))
            } else {
                dispatch(setNoChats(false))
            }
            setChat(data)
            dispatch(setChatData(data))
            data.forEach(element => {
                const { _id } = element;
                Promise.resolve(getMessageApi(_id)).then((res) => {
                    dispatch(addMessage({ messages: res?.data?.messages, _id }));
                })
            });
        }
        calling()
    }, [dispatch, allChats.length])

    useEffect(() => {
        setChat(allChats)
    }, [allChats])

    useEffect(() => {
        const calling = async () => {
            try {
                const { data } = await getStatusApi()
                dispatch(setAllStatus(data))
                setStatusData(data)
                setComponentLoading(false);
            } catch (err) {
                toast.error(err?.response?.data?.msg)
            }
        }
        calling()
    }, [dispatch, setLoading])
    
    useEffect(() => {
        setStatusData(allStatus)
    }, [allStatus])


    return (
        <div>
            <div className='chatMain' >
                <Hidden mdDown>
                    <AllChat chatData={chatData} />
                </Hidden>
                {componentLoading ?  <div className='status' style={{display:"flex",alignItems:"center",justifyContent:"center"}}> <CircularProgress /> </div>
                 : <AllStatus statusData={statusData} setLoading={setLoading} loading={loading} componentLoading={componentLoading} />
                }
            </div>
        </div>
    )
}

export default Status