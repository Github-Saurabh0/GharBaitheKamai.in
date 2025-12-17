import { Application } from "../models/Application.js";
import { Job } from "../models/Job.js";

export const applyToJob = async (req, res) => {
  try {
    const { jobId } = req.body;
    if (!jobId) {
      return res.status(400).json({ message: "Job ID is required" });
    }

    const job = await Job.findById(jobId);
    if (!job || job.status !== "open") {
      return res.status(400).json({ message: "Job not available" });
    }

    const existing = await Application.findOne({
      jobId,
      workerId: req.user._id
    });
    if (existing) {
      return res.status(400).json({ message: "Already applied to this job" });
    }

    const app = await Application.create({
      jobId,
      workerId: req.user._id,
      employerId: job.postedBy
    });

    res.status(201).json(app);
  } catch (error) {
    console.error("Apply job error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getApplicationsForJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    const apps = await Application.find({ jobId })
      .populate("workerId", "name phone city area skills expectedDailyWage")
      .sort({ createdAt: -1 });
    res.json(apps);
  } catch (error) {
    console.error("Get apps error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getMyApplications = async (req, res) => {
  try {
    const apps = await Application.find({ workerId: req.user._id })
      .populate("jobId")
      .sort({ createdAt: -1 });
    res.json(apps);
  } catch (error) {
    console.error("Get my apps error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
