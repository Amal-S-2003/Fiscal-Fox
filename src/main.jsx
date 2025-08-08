import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contextAPI/AuthContext.jsx";
import {  TransactionProvider } from "./contextAPI/TransactionContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <TransactionProvider>
          <App />
        </TransactionProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
