import React from 'react'
import { Avatar, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setOpen } from '../../reducer/UiSlice'



const SingleContainer = ({ props }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
 

  return (
    <button style={{ width: "100%" }} onClick={() => { navigate(`/chat/${props?._id}`); dispatch(setOpen(false))}} key={`${props?._id}`}>
      <div style={{ display: "flex", padding: "10px", alignItems: "center", gap: "8px", backgroundColor: "Gray", margin: "2px", borderRadius: "4px" }}>
        <Avatar src={props?.profilePic} alt='img' />
        <div>
          <Typography variant="body1" style={{ color: "pink" }}>
            {props?.name}
          </Typography>
          <Typography variant="body2" style={{ color: "white" }}>
            {props?.latestMessage?.content}
          </Typography>
        </div>
      </div>
    </button>
  )
}
function SearchContainer({ data }) {
  return (
    <div>
      {data.map((item) => <SingleContainer key={item?._id} props={item} />)}
    </div>
  )
}

export default SearchContainer