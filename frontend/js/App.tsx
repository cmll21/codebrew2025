import "./styles/App.css";
import "../assets/fonts/CrimsonPro-ExtraLight.ttf";
import { Route, Routes } from "react-router-dom";
import * as Sentry from "@sentry/react";
import cookie from "cookie";
import LandingPageHeader from "./components/LandingPageHeader";
import Footer from "./components/Footer";

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
  const [userInfo, setUserInfo] = useState<any>(null);

  useEffect(() => {
    if (loggedIn) {
      const accessToken = localStorage.getItem("access_token");
      if (accessToken) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
        // Fetch user info from backend
        axios.get("/api/users/me/")
          .then((res) => {
            setUserInfo(res.data);
          })
          .catch(() => {
            setUserInfo(null);
          });
      }
    } else {
      setUserInfo(null);
    }
  }, [loggedIn]);

  return (
    <Sentry.ErrorBoundary fallback={<p>An error has occurred.</p>}>
      <LandingPageHeader 
        loggedIn={loggedIn} 
        setLoggedIn={setLoggedIn}
        userType={userInfo?.user_type}
      />
      
      <Routes>
        <Route path="/" element={
          userInfo?.user_type === 'SUPPLIER' ? <SupplierHome userInfo={userInfo} /> : <Home />
        } />
        <Route path="/auth" element={<AuthPage setLoggedIn={setLoggedIn} />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/shop" element={<ShopProducePage />} />
      </Routes>

    <Footer/>
    </Sentry.ErrorBoundary>
  );
};

export default App;
