import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/LandingPageHeader.css";

interface LandingPageHeaderProps {
  loggedIn: boolean;
  setLoggedIn: (loggedIn: boolean) => void;
  userType: "CONSUMER" | "SUPPLIER" | null;
}

const LandingPageHeader = ({
  loggedIn,
  setLoggedIn,
  userType,
}: LandingPageHeaderProps) => {
  const [userInfo, setUserInfo] = useState<{
    first_name: string;
    last_name: string;
  } | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("loggedIn", loggedIn);
    if (loggedIn) {
      const accessToken = localStorage.getItem("access_token");
      axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
      axios
        .get("/api/users/me/")
        .then((res) => setUserInfo(res.data))
        .catch(() => setUserInfo(null));
    } else {
      setUserInfo(null);
    }
  }, [loggedIn]);

  const handleLogout = () => {
    // Clear tokens from localStorage
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    // Clear axios default headers
    delete axios.defaults.headers.common["Authorization"];
    // Update logged in state
    setLoggedIn(false);
    // Navigate to auth page
    navigate("/auth");
  };

  return (
    <header className="header-container">
      <div className="nav-left">
        <Link to="/about">About Us</Link>
        {userType !== "SUPPLIER" && <Link to="/shop">Shop Produce</Link>}
      </div>

      <h1 className="landing-page-title">
        <Link to="/">ReHarvest</Link>
      </h1>

      <div className="nav-right">
        {loggedIn ? (
          <div
            className="profile-dropdown-container"
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
          >
            <button className="profile-button">
              {userInfo
                ? `${userInfo.first_name} ${userInfo.last_name}`
                : "Loading..."}
            </button>
            {showDropdown && (
              <div className="profile-dropdown">
                <button onClick={handleLogout} className="dropdown-item">
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/auth">Log In/Sign Up</Link>
        )}
        {userType !== "SUPPLIER" && loggedIn && (
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
        )}
      </div>
    </header>
  );
};

export default LandingPageHeader;
