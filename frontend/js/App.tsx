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

OpenAPI.interceptors.request.use((request) => {
  const { csrftoken } = cookie.parse(document.cookie);
  if (request.headers && csrftoken) {
    request.headers["X-CSRFTOKEN"] = csrftoken;
  }
  return request;
});

const App = () => (
  <Sentry.ErrorBoundary fallback={<p>An error has occurred.</p>}>
    <LandingPageHeader />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
    </Routes>
  </Sentry.ErrorBoundary>
);

export default App;
