import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/app.scss";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import { HelmetProvider } from "react-helmet-async";
import AuthProvider from "./components/auth/AuthProvider.tsx";
import { Spinner } from "./components/ui/Spinner.tsx";

const helmetContext = {};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HelmetProvider context={helmetContext}>
      <BrowserRouter>
        <AuthProvider>
          <Spinner>
          <App />
          </Spinner>
        </AuthProvider>
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>
);
