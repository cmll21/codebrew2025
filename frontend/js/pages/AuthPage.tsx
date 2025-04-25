import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import axios from "axios";
import "../styles/AuthPage.css";

function AuthPage({ setAccessToken }: { setAccessToken: (token: string) => void }) {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    userType: "", // Default val
  });
  const [userInfo, setUserInfo] = useState<{
    email: string;
    user_type: string;
  } | null>(null);
  
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate auth
    console.log(isLogin ? "Logging in..." : "Signing up...", form);
    // setTimeout(() => navigate("/nextPage"), 500); // todo: Add next pages from log in and sign up
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
        setAccessToken(access);
        // Fetch user details
        const profileRes = await axios.get("/api/users/me/"); // adjust to your endpoint
        setUserInfo(profileRes.data);
        navigate("/");
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
      userType: "CONSUMER",
    });
    setUserInfo(null);
  };

  const handleUserTypeChange = (userType: string) => {
    setForm((prev) => ({
      ...prev,

      userType,
    }));
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
        <div className="left-ty-box">
          {isLogin
            ? "Thanks for Helping Us Defeat Food Waste!"
            : "Help Us Defeat Food Waste!"}
        </div>
        <div className="right-box">
          <div className="auth-box">
            <h2 className="auth-box-header">
              {isLogin ? "Welcome Back!" : "Sign Up"}
            </h2>

            <form onSubmit={handleSubmit}>
              <div>
                {!isLogin && (
                  <>
                    <div>
                      <label className="block text-sm font-medium">
                        First Name
                      </label>
                      <div></div>
                      <input
                        type="firstName"
                        value={form.firstName}
                        onChange={(e) =>
                          setForm({ ...form, firstName: e.target.value })
                        }
                        required
                        className="auth-input-field"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium">
                        Last Name
                      </label>

                      <div></div>
                      <input
                        type="lastName"
                        value={form.lastName}
                        onChange={(e) =>
                          setForm({ ...form, lastName: e.target.value })
                        }
                        required
                        className="auth-input-field"
                      />
                    </div>
                  </>
                )}

                <label>Email</label>

                <div></div>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                  className="auth-input-field"
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Password</label>

                <div></div>
                <input
                  type="password"
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  required
                  className="auth-input-field"
                />
              </div>

              {!isLogin && (
                <div>
                  <div className="form-group">
                    <div className="user-type-container">
                      <button
                        type="button"
                        className={`user-type-button ${
                          form.userType === "CONSUMER" ? "selected" : ""
                        }`}
                        onClick={() => handleUserTypeChange("CONSUMER")}
                      >
                        Customer
                      </button>

                      <button
                        type="button"
                        className={`user-type-button ${
                          form.userType === "SUPPLIER"
                            ? "supplier-selected"
                            : ""
                        }`}
                        onClick={() => handleUserTypeChange("SUPPLIER")}
                      >
                        Supplier
                      </button>
                    </div>
                  </div>
                </div>
              )}
              <div className="auth-button-container">
                <Button className="button" type="submit">
                  {isLogin ? "Log In" : "Sign Up"}
                </Button>
              </div>
            </form>

            <p className="text-sm text-center mt-4">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
              <button onClick={toggleMode} className="auth-toggle-link">
                {isLogin ? "Sign Up here." : "Log In here."}
              </button>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default AuthPage;
