import React from 'react';
import { Decryption } from '../../Decryption';
import { Avatar } from '@mui/material';

let dateStatus = null
let today = new Date();
let year = today.getFullYear();
let month = String(today.getMonth() + 1).padStart(2, '0'); 
let day = String(today.getDate()).padStart(2, '0');

let formattedDate = `${day}/${month}/${year}`;
const loginInfo = JSON.parse(localStorage.getItem('loginInfo'));



function MessagesContainer({ item, i, currentUser,chatwith }) {
  let direction = currentUser === item?.sender?._id ? "flex-end" : "flex-start";
  let className = currentUser === item?.sender?._id ? "end" : "start";

  const img = item?.sender?._id  === loginInfo?.id ? true : false;

  const message = Decryption(item?.content, item?.iv);
  
  // Parse the date string and format it as dd mm yyyy
  let messageDate = new Date(item.createdAt).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
  });

  // Check if the current message has a different date than the previous one
  let isNewDate = dateStatus !== messageDate;

  // Update the current date if it's a new date
  if (isNewDate) {
    dateStatus = messageDate;
  }

  
  return (
    <>
      {/* Display date heading if it's a new date */}
      {isNewDate && (
        <div style={{ textAlign: 'center', margin: '8px',fontSize:"12px",color:"#3498db" }}>
          <p>
            {messageDate === formattedDate ? 'Today' : messageDate}
          </p>
        </div>
      )}

      <div style={{ display: "flex", justifyContent: `${direction}` }}>
      {!img && <Avatar src={chatwith?.profilePic} style={{ margin: "4px" }} />}
        <div className={className} style={{ padding: "8px", margin: "4px", maxWidth: "50%", wordWrap:'break-word' }}>
           <p>{message}</p>
        </div>
        {img && <Avatar src={loginInfo?.profilePic} style={{ margin: "4px" }} />}
      </div>
    </>
  );
}

export default MessagesContainer;
