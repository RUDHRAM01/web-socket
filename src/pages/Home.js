import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Chat from '../components/chat/Chat';
import ChatLanding from '../components/chat/ChatLanding';


function Home() {
  return (
    <div>
      <Routes>
      <Route path="/" element={<ChatLanding />} />
        <Route path="/:id" element={<Chat />} />
      </Routes>
    </div>
  );
}

export default Home;
