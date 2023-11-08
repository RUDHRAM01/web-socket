import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import ToastAlert from "./components/toast/Error";
import { Provider } from "react-redux";
import store from "./store";
ReactDOM.render(

  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
    <ToastAlert />

  </BrowserRouter>
  , document.getElementById("root")
);