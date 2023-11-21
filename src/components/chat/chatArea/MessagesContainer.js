import React from 'react'

function MessagesContainer({ item, i, currentUser }) {
  let direction = currentUser === item?.sender?._id ? "flex-end" : "flex-start";
  return (
      <>
            <div style={{display:"flex",justifyContent:`${direction}`}}>
                <div style={{backgroundColor:`${i%2===0?"lightgray":"lightblue"}`,padding:"8px",borderRadius:"8px",margin:"4px",maxWidth:"50%"}}>
                    <p>{item?.content}</p>
              </div>
            </div>
      </>
  )
}

export default MessagesContainer