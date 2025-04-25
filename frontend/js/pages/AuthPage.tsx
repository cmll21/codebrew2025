import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import axios from "axios";
import "../styles/AuthPage.css";

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    userType: "",
  });
  const [userInfo, setUserInfo] = useState<{
    email: string;
    user_type: string;
  } | null>(null);
  // const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate auth
    console.log(isLogin ? "Logging in..." : "Signing up...", form);
    // setTimeout(() => navigate("/nextPage"), 500);
    try {
      const url = isLogin ? "/api/token/" : "/api/register/";
      const data = isLogin
        ? { email: form.email, password: form.password }
        : {
            first_name: form.firstName,
            last_name: form.lastName,
            email: form.email,
            password: form.password,
            user_type: form.userType,
          };

      const res = await axios.post(url, data);

      if (isLogin) {
        const { access, refresh } = res.data;

        // Store token
        localStorage.setItem("access_token", access);
        localStorage.setItem("refresh_token", refresh);
        axios.defaults.headers.common["Authorization"] = `Bearer ${access}`;

        // Fetch user details
        const profileRes = await axios.get("/api/users/me/"); // adjust to your endpoint
        setUserInfo(profileRes.data);
      } else {
        console.log("Signed up successfully!");
        setIsLogin(true);
      }
    } catch (error: any) {
      console.error("Auth failed:", error.response?.data || error.message);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setForm({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      userType: "",
    });
    setUserInfo(null);
  };

  useEffect(() => {
    // On mount, if token exists, fetch user info
    const token = localStorage.getItem("access_token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      axios
        .get("/api/users/me/")
        .then((res) => setUserInfo(res.data))
        .catch(() => setUserInfo(null));
    }
  }, []);

  return (
    <>
      <div className="login-container">
        <div className="left-ty-box">Thanks for Helping Us Defeat Food Waste!</div>
        <div className="right-box">Right (30%)</div>
      </div>
    </>
  );
}

export default AuthPage;
