import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import LoginPage from "./pages/LoginPage.jsx";
import WorkerJobsListPage from "./pages/WorkerJobsListPage.jsx";
import EmployerPostJobPage from "./pages/EmployerPostJobPage.jsx";

const App = () => {
  return (
    <div style={{ fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
      <header style={{ padding: "10px 16px", borderBottom: "1px solid #eee" }}>
        <Link to="/" style={{ textDecoration: "none", color: "#1D9A6C", fontWeight: 700 }}>
          GharBaitheKamai.in
        </Link>
      </header>
      <main style={{ padding: "12px 16px" }}>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/worker/jobs" element={<WorkerJobsListPage />} />
          <Route path="/employer/post-job" element={<EmployerPostJobPage />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
