import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Landing from '../components/landing/Landing';
import Chat from '../components/chat/Chat';
import SignIn from "../components/login/SignIn"; 
import SignUp from "../components/login/SignUp";

function Home() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/signUp" element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default Home;
