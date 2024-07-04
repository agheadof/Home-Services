/* eslint-disable */
import React from "react";
import ReactDOM from "react-dom";
import { HashRouter, BrowserRouter } from "react-router-dom";
import App from "./App";
import 'bootstrap/dist/css/bootstrap.css';


// Material Dashboard 2 React Context Provider
import { MaterialUIControllerProvider } from "context";
import { AuthProvider } from "context/Auth";
import { ToastContainer } from "react-toastify";


ReactDOM.render(
  <HashRouter>
    <AuthProvider>
      <MaterialUIControllerProvider>
        <ToastContainer autoClose={2000} theme="colored" />
        <App />
      </MaterialUIControllerProvider>
    </AuthProvider>
  </HashRouter>,
  document.getElementById("root")
);
