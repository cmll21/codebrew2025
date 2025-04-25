import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import axios from "axios";

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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100">
        <div className="bg-white p-8 rounded-2xl w-full max-w-md">
          <h2 className="text-2xl font-bold text-center">
            {isLogin ? "Welcome Back" : "Create an Account"}
          </h2>

          {userInfo && (
            <div className="bg-green-100 border p-4 rounded mb-4 text-center">
              <p>
                <strong>Email:</strong> {userInfo.email}
              </p>
              <p>
                <strong>User Type:</strong> {userInfo.user_type}
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Password</label>
              <input
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            {!isLogin && (
              <>
                <div>
                  <label className="block text-sm font-medium">
                    First Name
                  </label>
                  <input
                    type="firstName"
                    value={form.firstName}
                    onChange={(e) =>
                      setForm({ ...form, firstName: e.target.value })
                    }
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Last Name</label>
                  <input
                    type="lastName"
                    value={form.lastName}
                    onChange={(e) =>
                      setForm({ ...form, lastName: e.target.value })
                    }
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">User Type</label>
                  <select
                    value={form.userType || ""}
                    onChange={(e) =>
                      setForm({ ...form, userType: e.target.value })
                    }
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    <option value="" disabled>
                      Select User Type
                    </option>
                    <option value="SUPPLIER">Supplier</option>
                    <option value="CUSTOMER">Customer</option>
                  </select>
                </div>
              </>
            )}
            <Button type="submit">{isLogin ? "Login" : "Sign Up"}</Button>
          </form>
          <p className="text-sm text-center mt-4">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button onClick={toggleMode}>
              {isLogin ? "Sign Up" : "Login"}
            </button>
          </p>
        </div>
      </div>
      <button>
        <Link to="/">Go back</Link>
      </button>
    </>
  );
}

export default AuthPage;
