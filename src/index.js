import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import ChatProvider from "./context/Context";
import ToastAlert from "./components/toast/Error";
ReactDOM.render(

  <BrowserRouter>
    <ChatProvider>
      <App />
      <ToastAlert />
    </ChatProvider>
  </BrowserRouter>
  ,document.getElementById("root")
);