import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

function DummyPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ email: "", password: "", userType: "" });
  // const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate auth
    console.log(isLogin ? "Logging in..." : "Signing up...", form);
    // setTimeout(() => navigate("/nextPage"), 500);
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setForm({ email: "", password: "", userType: ""});
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100">
        <div className="bg-white p-8 rounded-2xl w-full max-w-md">
          <h2 className="text-2xl font-bold text-center">
            {isLogin ? "Welcome Back" : "Create an Account"}
          </h2>
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
              <div>
                <label className="block text-sm font-medium">User Type</label>
                <input
                  type="text"
                  value={form.userType || ""}
                  onChange={(e) =>
                    setForm({ ...form, userType: e.target.value })
                  }
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
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

export default DummyPage;
