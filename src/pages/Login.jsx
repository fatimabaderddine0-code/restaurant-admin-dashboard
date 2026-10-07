import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    setMessage("");

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Login failed.");
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("adminEmail", email);

      navigate("/dashboard");
    } catch (error) {
      console.log("Login error:", error);

      setMessage("Could not connect to the server.");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2>Admin Login</h2>

        <p className="login-subtitle">
          Login to manage La Tavola menu
        </p>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />

          <input
            type="password"
            className="form-control"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />

          <button
            type="submit"
            className="login-btn"
          >
            Login
          </button>
        </form>

        {message && (
          <p className="mt-3 text-center">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

export default Login;