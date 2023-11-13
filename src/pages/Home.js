import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Chat from '../components/chat/Chat';
import ChatLanding from '../components/chat/ChatLanding';
import { useSelector } from "react-redux";
import Login from './Login';
import CreateAccount from './CreateAccount';




function Home() {
  const navigate = useNavigate( )
  const login = useSelector((state) => state.userStore.isLogin);
  console.log(login);
  
  useEffect(() => {

    if (!login && window.location.pathname === "/create-account") {
      navigate("/create-account")
    } else if(!login){
      navigate("/login")
    }
  }, [login,navigate])

  return (
    <div>
      <Routes>
        {
          login ? <>
            <Route path="/" element={<ChatLanding />} />
            <Route path="/:id" element={<Chat />} />
          </> : <>
            <Route path='/login' element={<Login />} />
            <Route path='/create-account' element={<CreateAccount />} />
          </>}
      </Routes>
    </div>
  );
}

export default Home;
