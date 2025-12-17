import { Job } from "../models/Job.js";

export const createJob = async (req, res) => {
  try {
    const {
      title,
      description,
      jobType,
      wageType,
      amount,
      city,
      area,
      lng,
      lat,
      requiredWorkers,
      startDate,
      endDate
    } = req.body;

    if (!title || !amount) {
      return res.status(400).json({ message: "Title and amount are required" });
    }

    const job = await Job.create({
      postedBy: req.user._id,
      title,
      description,
      jobType,
      wageType,
      amount,
      city,
      area,
      location: {
        type: "Point",
        coordinates: [lng || 0, lat || 0]
      },
      requiredWorkers,
      startDate,
      endDate
    });

    res.status(201).json(job);
  } catch (error) {
    console.error("Create job error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getJobs = async (req, res) => {
  try {
    const { city, role } = req.query;
    const filter = { status: "open" };
    if (city) filter.city = city;

    const jobs = await Job.find(filter)
      .sort({ createdAt: -1 })
      .limit(100)
      .lean();

    res.json(jobs);
  } catch (error) {
    console.error("Get jobs error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate("postedBy", "name phone area city");
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    res.json(job);
  } catch (error) {
    console.error("Get job error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getMyJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ postedBy: req.user._id }).sort({ createdAt: -1 });
    res.json(jobs);
  } catch (error) {
    console.error("Get my jobs error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
