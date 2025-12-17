import express from "express";
import { createJob, getJobs, getJobById, getMyJobs } from "../controllers/jobController.js";
import { protect, requireRole } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", getJobs);
router.get("/my", protect, requireRole("employer"), getMyJobs);
router.get("/:id", getJobById);
router.post("/", protect, requireRole("employer"), createJob);

export default router;
