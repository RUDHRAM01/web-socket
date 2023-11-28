import React from 'react';
import { Decryption } from '../../Decryption';

let dateStatus = null
let today = new Date();
let year = today.getFullYear();
let month = String(today.getMonth() + 1).padStart(2, '0'); 
let day = String(today.getDate()).padStart(2, '0');

let formattedDate = `${day}/${month}/${year}`;



function MessagesContainer({ item, i, currentUser }) {
  let direction = currentUser === item?.sender?._id ? "flex-end" : "flex-start";
  let className = currentUser === item?.sender?._id ? "end" : "start";
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
        <div className={className} style={{ padding: "8px", margin: "4px", maxWidth: "50%" }}>
          <p>{message}</p>
        </div>
      </div>
    </>
  );
}

export default MessagesContainer;
