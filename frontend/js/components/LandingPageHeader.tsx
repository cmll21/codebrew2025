import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const LandingPageHeader = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState<{
    first_name: string;
    last_name: string;
  } | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    setIsLoggedIn(token ? true : false);
    if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        axios
          .get("/api/users/me/")
          .then((res) => setUserInfo(res.data))
          .catch(() => setUserInfo(null));
    }
    console.log(userInfo);
  }, []);

  return (
    <header className="header-container">
      <div className="nav-left">
        <a href="#about">About Us</a>
        <a href="#shop">Shop Produce</a>
      </div>

      <h1 className="landing-page-title">
        <a href="#">Farmers' Market</a>
      </h1>

      <div className="nav-right">
        {isLoggedIn ? (
          // Profile button
          <a href="#auth">{userInfo ? `${userInfo.first_name} ${userInfo.last_name}` : "Loading..."}</a>
        ) : (
          // Log In/Sign Up button
          <a href="#auth">Log In/Sign Up</a>
        )}
        <Link to="/checkout" className="cart-button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 31 30"
            fill="none"
          >
            <path
              d="M26.8283 19.0909V21.8182H9.10102V20.4545H7.73738V15H6.37375V10.9091H5.01011V4.09091H2.28284V1.36364H7.73738V5.45455H29.5556V10.9091H28.1919V15H26.8283V16.3636H10.4647V19.0909H26.8283ZM7.73738 9.54545H9.10102V13.6364H25.4647V9.54545H26.8283V8.18182H7.73738V9.54545ZM10.4647 23.1818H13.1919V24.5455H14.5556V27.2727H13.1919V28.6364H10.4647V27.2727H9.10102V24.5455H10.4647V23.1818ZM21.3737 23.1818H24.101V24.5455H25.4647V27.2727H24.101V28.6364H21.3737V27.2727H20.0101V24.5455H21.3737V23.1818Z"
              fill="#3C3C3B"
            />
          </svg>
        </Link>
      </div>
    </header>
  );
};

export default LandingPageHeader;
