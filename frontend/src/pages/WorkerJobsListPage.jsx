import React, { useEffect, useState } from "react";
import api from "../services/apiClient.js";

const WorkerJobsListPage = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await api.get("/api/jobs");
        setJobs(res.data || []);
      } catch (err) {
        setError(err.response?.data?.message || "Jobs load nahi ho paaye");
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const handleApply = async (jobId) => {
    try {
      await api.post("/api/applications", { jobId });
      alert("Job ke liye apply ho gaya ✅");
    } catch (err) {
      alert(err.response?.data?.message || "Apply nahi ho paaya");
    }
  };

  return (
    <div>
      <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>Aapke Shehar ke Jobs</h2>
      {loading && <p>Loading jobs...</p>}
      {error && <p style={{ color: "red", fontSize: 13 }}>{error}</p>}

      {jobs.map((job) => (
        <div
          key={job._id}
          style={{
            border: "1px solid #eee",
            borderRadius: 10,
            padding: 10,
            marginBottom: 10
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <h3 style={{ fontSize: 15, fontWeight: 600 }}>{job.title}</h3>
              <p style={{ fontSize: 12, color: "#555" }}>
                {job.area}, {job.city}
              </p>
            </div>
            <div style={{ textAlign: "right" }}>
              <p style={{ fontSize: 14, fontWeight: 700, color: "#1D9A6C" }}>
                ₹{job.amount}
              </p>
              <p style={{ fontSize: 11, color: "#777" }}>
                {job.wageType === "per_day" ? "/din" : job.wageType === "per_task" ? "/kaam" : "/ghanta"}
              </p>
            </div>
          </div>
          <p style={{ fontSize: 12, margin: "6px 0" }}>{job.description}</p>
          <button
            onClick={() => handleApply(job._id)}
            style={{
              padding: "6px 10px",
              borderRadius: 6,
              border: "none",
              background: "#1D9A6C",
              color: "#fff",
              fontSize: 13,
              cursor: "pointer"
            }}
          >
            Mujhe ye kaam chahiye
          </button>
        </div>
      ))}

      {!loading && jobs.length === 0 && (
        <p style={{ fontSize: 13 }}>Abhi koi job nahi hai. Thodi der baad check karein.</p>
      )}
    </div>
  );
};

export default WorkerJobsListPage;
