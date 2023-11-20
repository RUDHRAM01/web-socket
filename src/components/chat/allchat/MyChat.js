import React from 'react'
import SingleChat from './SingleChat'
import Typography from '@mui/material/Typography'
// import data from "../../../common-data/Common.json"

function MyChat({data}) {
  return (
      <div>
          {data.length > 0 ? data.map((item) => <SingleChat props={item} key={item?._id}/>) : <Typography variant="subtitle2" style={{color:"white"}}>No Chat</Typography> }
    </div>
  )
}

export default MyChat