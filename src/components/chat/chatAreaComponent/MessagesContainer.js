import React, { useState } from "react";
import { Decryption } from "../../Decryption";
import { Avatar } from "@mui/material";

let dateStatus = null;
let today = new Date();
let year = today.getFullYear();
let month = String(today.getMonth() + 1).padStart(2, "0");
let day = String(today.getDate()).padStart(2, "0");

let formattedDate = `${day}/${month}/${year}`;
const loginInfo = JSON.parse(localStorage.getItem("loginInfo"));

function MessagesContainer({ item, i, currentUser, chatwith }) {
  const [selectedMessageEmoji, setSelectedMessageEmoji] = useState(null);
  let direction = currentUser === item?.sender?._id ? "flex-end" : "flex-start";
  let className = currentUser === item?.sender?._id ? "end" : "start";
  const [showSuggestions, setShowSuggestions] = useState(false);
  const img = item?.sender?._id === loginInfo?.id ? true : false;

  const message = Decryption(item?.content, item?.iv);

  // Parse the date string and format it as dd mm yyyy
  let messageDate = new Date(item.createdAt).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  });

  // Check if the current message has a different date than the previous one
  let isNewDate = dateStatus !== messageDate;

  // Update the current date if it's a new date
  if (isNewDate) {
    dateStatus = messageDate;
  }

  return (
    <>
      <div style={{ position: "relative" }}  onMouseLeave={() => setShowSuggestions(false)}>
        {/* Display date heading if it's a new date */}
        {isNewDate && (
          <div
            style={{
              textAlign: "center",
              margin: "8px",
              fontSize: "12px",
              color: "#3498db",
            }}
          >
            <p>{messageDate === formattedDate ? "Today" : messageDate}</p>
          </div>
        )}
        {showSuggestions && (
          <div
            style={{
              position: "absolute",
              top: "-30px", // Adjust as needed
              left: className === "start" && "0",
              right: className === "end" && "0" ,
              background: "#fff",
              border: "1px solid #ccc",
              padding: "5px",
              borderRadius: "5px",
              boxShadow: "0px 0px 5px rgba(0,0,0,0.3)",
              zIndex: "999",
            }}
            className="emojis"
            onMouseEnter={() => setShowSuggestions(true)} 
            onMouseLeave={() => setShowSuggestions(false)}
          >
            {/* Here you can have your emoji suggestions */}
            <button onClick={() => {setSelectedMessageEmoji("❤️");setShowSuggestions(false)}}>
              <span role="img" aria-label="Heart">
                ❤️
              </span>
            </button>
            <button onClick={() => {setSelectedMessageEmoji("😂");setShowSuggestions(false)}}>
              <span role="img" aria-label="Laugh">
                😂
              </span>
            </button>
            <button onClick={() => {setSelectedMessageEmoji("👍");setShowSuggestions(false)}}>
              <span role="img" aria-label="Thumbs Up">
                👍
              </span>
            </button>
            {/* Add more emoji suggestions as needed */}
          </div>
        )}
        <div style={{ display: "flex", justifyContent: `${direction}` }}>
          {!img && (
            <Avatar src={chatwith?.profilePic} style={{ margin: "4px" }} />
          )}
          <div
            className={className}
            style={{
              padding: "8px",
              margin: "4px",
              maxWidth: "50%",
              wordWrap: "break-word",
            }}
            onMouseEnter={() => setShowSuggestions(true)}
            onMouseLeave={() => setShowSuggestions(false)} 
          >
            <p>{message}</p>
            {selectedMessageEmoji && (
              <button
                onClick={() => {setSelectedMessageEmoji(null);setShowSuggestions(false)}}
                onMouseLeave={() => setShowSuggestions(false)} 
              >
                <div
                  style={{ textAlign: className === "start" ? "end" : "start" }}
                >
                  <span
                    role="img"
                    aria-label="Selected Emoji"
                    style={{
                      fontSize: "12px",
                      position: "relative",
                      background: "white",
                      borderRadius: "50%",
                    }}
                  >
                    {selectedMessageEmoji}
                  </span>
                </div>
              </button>
            )}
          </div>
          {img && (
            <Avatar src={loginInfo?.profilePic} style={{ margin: "4px" }} />
          )}
        </div>
      </div>
    </>
  );
}

export default MessagesContainer;
