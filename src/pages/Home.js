import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Chat from '../components/chat/Chat';
import ChatLanding from '../components/chat/ChatLanding';
import Login from './Login';
import CreateAccount from './CreateAccount';
import { useDispatch } from 'react-redux';
import PageNotFound from './PageNotFound';
import ForgotPassword from './ForgotPassword';
import UpdatePassword from './UpdatePassword';
import Status from '../components/status/Status';



function Home() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  var data = localStorage.getItem('loginInfo');

  useEffect(() => { 
    if(window.location.pathname === "/login") {
      navigate('/login')
    }else if(window.location.pathname === "/create-account") {
      navigate('/create-account')
    } else if (window.location.pathname === "/forgot-password") {
      navigate('/forgot-password')
    } 
  }, [data, navigate, dispatch])

  return (
    <div>
      <Routes>
        {
          data ? <>
            <Route path="/" element={<ChatLanding />} />
            <Route path="/chat/:id" element={<Chat />} />
            <Route path="/status/:id" element={<Status />} />
            <Route path="/*" element={<PageNotFound />} />
            <Route path="/404" element={<PageNotFound />} />
          </> : <>
            <Route path='/login' element={<Login />} />
            <Route path='/create-account' element={<CreateAccount />} />
              <Route path='/forgot-password' element={<ForgotPassword />} />
              <Route path='/updatePassword/:id' element={<UpdatePassword />} />
              <Route path="/*" element={<PageNotFound />} />
          </>}
      </Routes>
    </div>
  );
}

export default Home;
