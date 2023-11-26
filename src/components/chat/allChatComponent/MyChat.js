import React from 'react'
import SingleChat from './SingleChat'
import NoChatFound from './NoChatFound'
function MyChat({ data }) {

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "80%", gap: "8px", overflow: "scroll" }} className='myChatContainer'>
      {data.length > 0 ? data.map((item) => <SingleChat props={item} key={item?._id} />) : <NoChatFound />}
    </div>
  )
}

export default MyChat