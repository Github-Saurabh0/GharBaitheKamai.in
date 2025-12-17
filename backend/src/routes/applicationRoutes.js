import express from "express";
import {
  applyToJob,
  getApplicationsForJob,
  getMyApplications
} from "../controllers/applicationController.js";
import { protect, requireRole } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", protect, requireRole("worker"), applyToJob);
router.get("/mine", protect, requireRole("worker"), getMyApplications);
router.get("/job/:jobId", protect, requireRole("employer"), getApplicationsForJob);

export default router;
