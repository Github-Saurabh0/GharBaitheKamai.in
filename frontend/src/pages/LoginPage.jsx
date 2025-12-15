import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/apiClient.js";

const LoginPage = () => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("worker");
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const endpoint = isLogin ? "/api/auth/login" : "/api/auth/register";
      const res = await api.post(endpoint, { phone, password, role });
      localStorage.setItem("gbk_token", res.data.token);
      localStorage.setItem("gbk_user", JSON.stringify(res.data.user));
      if (role === "worker") {
        navigate("/worker/jobs");
      } else {
        navigate("/employer/post-job");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 420, margin: "0 auto" }}>
      <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>Kaam bhi, Kamai bhi</h1>
      <p style={{ fontSize: 13, color: "#555", marginBottom: 16 }}>Aapke Shehar Se.</p>

      <div style={{ marginBottom: 16 }}>
        <button
          onClick={() => setRole("worker")}
          style={{
            padding: "6px 10px",
            marginRight: 6,
            borderRadius: 6,
            border: "1px solid #1D9A6C",
            background: role === "worker" ? "#1D9A6C" : "#fff",
            color: role === "worker" ? "#fff" : "#1D9A6C",
            fontSize: 13
          }}
        >
          Main Worker hoon
        </button>
        <button
          onClick={() => setRole("employer")}
          style={{
            padding: "6px 10px",
            borderRadius: 6,
            border: "1px solid #1D9A6C",
            background: role === "employer" ? "#1D9A6C" : "#fff",
            color: role === "employer" ? "#fff" : "#1D9A6C",
            fontSize: 13
          }}
        >
          Main Kaam Dene Wala hoon
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <label style={{ fontSize: 13, display: "block", marginBottom: 4 }}>Phone Number</label>
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="10 digit mobile number"
          style={{
            width: "100%",
            padding: "8px 10px",
            marginBottom: 10,
            borderRadius: 6,
            border: "1px solid #ddd",
            fontSize: 14
          }}
        />

        <label style={{ fontSize: 13, display: "block", marginBottom: 4 }}>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Simple password (OTP later)"
          style={{
            width: "100%",
            padding: "8px 10px",
            marginBottom: 10,
            borderRadius: 6,
            border: "1px solid #ddd",
            fontSize: 14
          }}
        />

        {error && (
          <p style={{ color: "red", fontSize: 12, marginBottom: 8 }}>
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "9px 10px",
            borderRadius: 8,
            border: "none",
            background: "#1D9A6C",
            color: "#fff",
            fontSize: 15,
            fontWeight: 600,
            marginTop: 4,
            cursor: "pointer"
          }}
        >
          {loading ? "Please wait..." : isLogin ? "Login" : "Register"}
        </button>
      </form>

      <button
        onClick={() => setIsLogin(!isLogin)}
        style={{
          marginTop: 10,
          fontSize: 13,
          color: "#1D9A6C",
          background: "none",
          border: "none",
          cursor: "pointer"
        }}
      >
        {isLogin ? "Naya account banayein" : "Already account hai? Login karein"}
      </button>
    </div>
  );
};

export default LoginPage;
