import { useState } from "react";
import { supabase } from "../supabase/client";
import { Link } from "react-router-dom";
import "../css/auth.css";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { role },
      },
    });

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    alert(
      "Registration complete. Please check your email for further confirmation."
    );

    window.location.href = "/login";
  };

  return (
    <div className="auth-page">
      <form className="auth-card" onSubmit={handleRegister}>
        <h2 className="auth-title">Create Account</h2>

        <input
          className="auth-input"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          className="auth-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <div style={{ marginBottom: "14px" }}>
          <strong>Register as</strong>
          <div>
            <label>
              <input
                type="radio"
                checked={role === "user"}
                onChange={() => setRole("user")}
              />{" "}
              User
            </label>
          </div>
          <div>
            <label>
              <input
                type="radio"
                checked={role === "owner"}
                onChange={() => setRole("owner")}
              />{" "}
              Owner
            </label>
          </div>
        </div>

        <button className="auth-btn" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>

        <div className="auth-footer">
          Already registered? <Link to="/login">Login</Link>
        </div>
      </form>
    </div>
  );
}
