import React, { useState } from "react";
import api from "../services/apiClient.js";

const EmployerPostJobPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [city, setCity] = useState("");
  const [area, setArea] = useState("");
  const [wageType, setWageType] = useState("per_day");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);
    try {
      await api.post("/api/jobs", {
        title,
        description,
        amount: Number(amount),
        city,
        area,
        wageType
      });
      setMessage("Job post ho gaya ✅");
      setTitle("");
      setDescription("");
      setAmount("");
      setCity("");
      setArea("");
    } catch (err) {
      setMessage(err.response?.data?.message || "Job post nahi ho paaya");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 480, margin: "0 auto" }}>
      <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>Naya Job Post Karein</h2>
      <form onSubmit={handleSubmit}>
        <label style={{ fontSize: 13 }}>Job Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Jaise: Packing Helper"
          style={{
            width: "100%",
            padding: "8px 10px",
            borderRadius: 6,
            border: "1px solid #ddd",
            marginBottom: 8
          }}
        />

        <label style={{ fontSize: 13 }}>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Kaam ka detail"
          rows={3}
          style={{
            width: "100%",
            padding: "8px 10px",
            borderRadius: 6,
            border: "1px solid #ddd",
            marginBottom: 8
          }}
        />

        <label style={{ fontSize: 13 }}>Amount (₹)</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Jaise: 500"
          style={{
            width: "100%",
            padding: "8px 10px",
            borderRadius: 6,
            border: "1px solid #ddd",
            marginBottom: 8
          }}
        />

        <label style={{ fontSize: 13 }}>Wage Type</label>
        <select
          value={wageType}
          onChange={(e) => setWageType(e.target.value)}
          style={{
            width: "100%",
            padding: "8px 10px",
            borderRadius: 6,
            border: "1px solid #ddd",
            marginBottom: 8
          }}
        >
          <option value="per_day">Per Din</option>
          <option value="per_task">Per Kaam</option>
          <option value="per_hour">Per Ghanta</option>
        </select>

        <label style={{ fontSize: 13 }}>Shehar</label>
        <input
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Jaise: Nagpur"
          style={{
            width: "100%",
            padding: "8px 10px",
            borderRadius: 6,
            border: "1px solid #ddd",
            marginBottom: 8
          }}
        />

        <label style={{ fontSize: 13 }}>Area / Locality</label>
        <input
          value={area}
          onChange={(e) => setArea(e.target.value)}
          placeholder="Jaise: Itwari"
          style={{
            width: "100%",
            padding: "8px 10px",
            borderRadius: 6,
            border: "1px solid #ddd",
            marginBottom: 8
          }}
        />

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
            marginTop: 6,
            cursor: "pointer"
          }}
        >
          {loading ? "Posting..." : "Job Post Karein"}
        </button>

        {message && (
          <p style={{ marginTop: 8, fontSize: 13 }}>
            {message}
          </p>
        )}
      </form>
    </div>
  );
};

export default EmployerPostJobPage;
