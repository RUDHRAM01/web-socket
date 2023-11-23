import React from 'react'


function MessagesContainer({ item, i, currentUser }) {
  let direction = currentUser === item?.sender?._id ? "flex-end" : "flex-start";
  let className = currentUser === item?.sender?._id ? "end" : "start";
  return (
    <>
      <div style={{ display: "flex", justifyContent: `${direction}` }}>
        <div className={className} style={{ padding: "8px", margin: "4px", maxWidth: "50%" }}>
          <p>{item?.content}</p>
        </div>
      </div>
      
    </>
  )
}

export default MessagesContainer