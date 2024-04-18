import React from 'react'
import SingleChat from './SingleChat'
import NoChatFound from './NoChatFound'
import { useSelector } from 'react-redux'

function MyChat({ data }) {
  const isConnecting = useSelector((state) => state.uiStore.isConnecting);
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "80%", gap: "8px", overflow: "scroll" }} className='myChatContainer'>
      {isConnecting && <h1 style={{ color: "white", textAlign: "center" }}>Connecting to server...</h1>}
      {data.length > 0 ? data.map((item) => <SingleChat props={item} key={item?._id} />) : <NoChatFound />}
    </div>
  )
}

export default MyChat