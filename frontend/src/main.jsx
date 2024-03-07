import React from "react";
import { NextUIProvider } from "@nextui-org/react";
import { BrowserRouter } from "react-router-dom";

import { CookiesProvider } from "react-cookie";

import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import AuthContextProvider from "./contexts/AuthContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthContextProvider>
    <BrowserRouter>
      <CookiesProvider>
        <NextUIProvider>
          <React.StrictMode>
            <App />
          </React.StrictMode>
        </NextUIProvider>
      </CookiesProvider>
    </BrowserRouter>
  </AuthContextProvider>
);
