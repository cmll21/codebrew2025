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
import ProducePage from "./pages/ProducePage";
import { useState } from "react";

OpenAPI.interceptors.request.use((request) => {
  const { csrftoken } = cookie.parse(document.cookie);
  if (request.headers && csrftoken) {
    request.headers["X-CSRFTOKEN"] = csrftoken;
  }
  return request;
});
  
const App = () => {
  // State to store the access token
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <Sentry.ErrorBoundary fallback={<p>An error has occurred.</p>}>
      {/* Pass accessToken to LandingPageHeader */}
      <LandingPageHeader loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      
      <Routes>
        <Route path="/" element={<Home />} />
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
