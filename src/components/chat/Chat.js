import React, { useEffect, useState } from 'react'
import axios from 'axios';
function Chat() {
    const [chat, setChat] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const {data} = await axios.get('http://localhost:3000/api/chats');
                setChat(data);
            } catch (err) {
                console.log(err);
            }
        }
        fetchData();
    }, []);
  return (
      <div>{}</div>
  )
}

export default Chat