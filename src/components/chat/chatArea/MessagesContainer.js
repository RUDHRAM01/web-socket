import React from 'react'

function MessagesContainer({mess,i}) {
  return (
      <>
            <div style={{display:"flex",justifyContent:`${i%2===0?"flex-start":"flex-end"}`}}>
                <div style={{backgroundColor:`${i%2===0?"lightgray":"lightblue"}`,padding:"8px",borderRadius:"8px",margin:"4px",maxWidth:"50%"}}>
                    <p>{mess}</p>
              </div>
            </div>
      </>
  )
}

export default MessagesContainer