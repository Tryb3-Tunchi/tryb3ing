import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
// import { Provider } from "react-redux";
import App from "./App.tsx";
import { AuthProvider } from "./auth/AuthContext.tsx";
import { BrowserRouter } from "react-router-dom";
import { BalanceProvider } from "./components/balance/BalanceContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BalanceProvider>
      <BrowserRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>
    </BalanceProvider>
  </StrictMode>
);
