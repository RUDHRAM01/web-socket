import React from 'react'
import Typography from '@mui/material/Typography'
import { FaRocketchat } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { setOpen } from '../../../reducer/UiSlice';
import { useSelector } from 'react-redux';
import Loader from '../../navigation/Loader';

function NoChatFound() {
  const dispatch = useDispatch()
  const noChats = useSelector((state) => state.chatStore.NoChats);
  return (
    <>
      {
        noChats ?
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "50vh" }
          } >
            <div style={{ backgroundColor: "white", height: "20vh", width: "60%", borderRadius: "4px", position: "relative" }} className='noChatFoundContainer'>
              <div style={{ position: "absolute", top: "8px", left: "8px" }}>
                <p >
                  <FaRocketchat />
                </p>
              </div>
              <Typography variant="h6" style={{ fontWeight: "600" }}>
                No Chat Found
              </Typography>
              <button className='makeAChat' onClick={() => dispatch(setOpen(true))}>
                Create a chat
              </button>
            </div>
          </div >
          :
          <>
            <Loader />
            <Loader />
            <Loader />
            <Loader />
          </>

      }
    </>

  )
}

export default NoChatFound