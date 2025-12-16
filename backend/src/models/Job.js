import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    title: { type: String, required: true },
    description: String,
    jobType: {
      type: String,
      enum: ["daily", "one_time", "part_time", "full_time"],
      default: "daily"
    },
    wageType: {
      type: String,
      enum: ["per_day", "per_task", "per_hour"],
      default: "per_day"
    },
    amount: { type: Number, required: true },
    city: String,
    area: String,
    location: {
      type: { type: String, enum: ["Point"], default: "Point" },
      coordinates: { type: [Number], default: [0, 0] }
    },
    requiredWorkers: { type: Number, default: 1 },
    startDate: Date,
    endDate: Date,
    status: {
      type: String,
      enum: ["open", "closed", "completed"],
      default: "open"
    },
    isFeatured: { type: Boolean, default: false }
  },
  { timestamps: true }
);

jobSchema.index({ location: "2dsphere" });

export const Job = mongoose.model("Job", jobSchema);
