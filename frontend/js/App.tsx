import "./styles/App.css";
import "../assets/fonts/CrimsonPro-ExtraLight.ttf";
import { Route, Routes } from "react-router-dom";
import * as Sentry from "@sentry/react";
import cookie from "cookie";
import LandingPageHeader from "./components/LandingPageHeader";

import { OpenAPI } from "./api";
import Home from "./pages/Home";
import AuthPage from "./pages/AuthPage";
import AboutPage from "./pages/AboutPage";
import CheckoutPage from "./pages/CheckoutPage";
import ShopProducePage from "./pages/ShopProducePage";
import SupplierHome from "./pages/SupplierHome";
import { useState, useEffect } from "react";
import axios from "axios";

OpenAPI.interceptors.request.use((request) => {
  const { csrftoken } = cookie.parse(document.cookie);
  if (request.headers && csrftoken) {
    request.headers["X-CSRFTOKEN"] = csrftoken;
  }
  return request;
});

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userType, setUserType] = useState<'CONSUMER' | 'SUPPLIER' | null>(null);

  useEffect(() => {
    if (loggedIn) {
      const accessToken = localStorage.getItem("access_token");
      if (accessToken) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
        // Fetch user type from backend
        axios.get("/api/users/me/")
          .then((res) => {
            setUserType(res.data.user_type);
          })
          .catch(() => {
            setUserType(null);
          });
      }
    } else {
      setUserType(null);
    }
  }, [loggedIn]);

  return (
    <Sentry.ErrorBoundary fallback={<p>An error has occurred.</p>}>
      <LandingPageHeader 
        loggedIn={loggedIn} 
        setLoggedIn={setLoggedIn}
        userType={userType}
      />
      
      <Routes>
        <Route path="/" element={
          userType === 'SUPPLIER' ? <SupplierHome /> : <Home />
        } />
        <Route path="/auth" element={<AuthPage setLoggedIn={setLoggedIn} />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/shop" element={<ShopProducePage />} />
      </Routes>
    </Sentry.ErrorBoundary>
  );
};

export default App;
