import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Landing from '../components/landing/Landing';
import Chat from '../components/chat/Chat';
function Home() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </div>
  );
}

export default Home;
