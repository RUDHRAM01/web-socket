import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Chat from '../components/chat/Chat';
import ChatLanding from '../components/chat/ChatLanding';
import Login from './Login';
import CreateAccount from './CreateAccount';
import { useDispatch } from 'react-redux';
import PageNotFound from './PageNotFound';




function Home() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  var data = localStorage.getItem('loginInfo');
  
  

  useEffect(() => {

    if (!data && window.location.pathname === "/create-account") {
      navigate("/create-account")
    } else if (!data) {
      navigate("/login")
    } 
  }, [data, navigate, dispatch])

  return (
    <div>
      <Routes>
        {
          data ? <>
            <Route path="/" element={<ChatLanding />} />
            <Route path="/chat/:id" element={<Chat />} />
            <Route path="/*" element={<PageNotFound />} />
          </> : <>
            <Route path='/login' element={<Login />} />
            <Route path='/create-account' element={<CreateAccount />} />

          </>}
      </Routes>
    </div>
  );
}

export default Home;
