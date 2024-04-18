import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Chat from "../components/chat/Chat";
import ChatLanding from "../components/chat/ChatLanding";
import Login from "./Login";
import CreateAccount from "./CreateAccount";
import { useDispatch } from "react-redux";
import PageNotFound from "./PageNotFound";
import ForgotPassword from "./ForgotPassword";
import UpdatePassword from "./UpdatePassword";
import Status from "../components/status/Status";
import LoginAsGuest from "./LoginAsGuest";
import axios from "axios";
import { setIsConnecting } from "../reducer/UiSlice";

function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  var data = localStorage.getItem("loginInfo");
  
  useEffect(() => {
    const connectToServer = async () => {
      const res = await axios.get("https://web-server-plg9.onrender.com/");
      if (res.status === 200) {
        dispatch(setIsConnecting(false));
      }
    };

    connectToServer();
  },[dispatch]);

  useEffect(() => {
    if (window.location.pathname === "/login") {
      navigate("/login");
    } else if (window.location.pathname === "/create-account") {
      navigate("/create-account");
    } else if (window.location.pathname === "/forgot-password") {
      navigate("/forgot-password");
    } else if (window.location.pathname === "/as-guest") {
      navigate("/as-guest");
    }
  }, [data, navigate, dispatch]);

  return (
    <div>
      <Routes>
        {data ? (
          <>
            <Route path="/" element={<ChatLanding />} />
            <Route path="/chat/:id" element={<Chat />} />
            <Route path="/status/:id" element={<Status />} />
            <Route path="/*" element={<PageNotFound />} />
            <Route path="/404" element={<PageNotFound />} />
          </>
        ) : (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/as-guest" element={<LoginAsGuest />} />
            <Route path="/create-account" element={<CreateAccount />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/updatePassword/:id" element={<UpdatePassword />} />
            <Route path="/*" element={<PageNotFound />} />
          </>
        )}
      </Routes>
    </div>
  );
}

export default Home;
