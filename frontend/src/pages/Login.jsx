import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Staff");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();

    if (!email || !password) {
      alert("Please enter email and password.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:5000/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Login failed.");
        return;
      }

      // Check selected role
      if (data.user.role !== role) {
        alert(
          `This account is registered as ${data.user.role}. Please select the correct role.`
        );
        return;
      }

      // Save login information
      localStorage.setItem("expense_token", data.token);
      localStorage.setItem(
        "expense_user",
        JSON.stringify(data.user)
      );
      localStorage.setItem("expense_role", data.user.role);

      // Go to dashboard
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);

      alert(
        "Cannot connect to the backend. Please make sure the backend server is running."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">

        <div className="login-logo">
          EC
        </div>

        <h1>Expense Claims</h1>

        <p className="login-subtitle">
          Sign in to manage your expense claims
        </p>

        <form onSubmit={handleLogin}>

          {/* Email */}
          <div className="form-group">
            <label>Email</label>

            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password */}
          <div className="form-group">
            <label>Password</label>

            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Role */}
          <div className="form-group">
            <label>Role</label>

            <select
              value={role}
              onChange={(event) => setRole(event.target.value)}
            >
              <option value="Staff">Staff</option>
              <option value="Manager">Manager</option>
              <option value="Finance">Finance</option>
            </select>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="login-button"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        {/* Create Account */}
        <p className="login-demo">
          Don't have an account?{" "}
          <Link to="/register">
            Create Account
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Login;