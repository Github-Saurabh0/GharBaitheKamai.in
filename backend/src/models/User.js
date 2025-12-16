import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: ["worker", "employer", "admin"],
      default: "worker",
      required: true
    },
    phone: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    name: {
      type: String,
      trim: true
    },
    password: {
      type: String,
      required: true
    },
    gender: String,
    age: Number,
    city: String,
    area: String,
    location: {
      type: { type: String, enum: ["Point"], default: "Point" },
      coordinates: { type: [Number], default: [0, 0] } // [lng, lat]
    },
    skills: [{ type: String }],
    expectedDailyWage: Number,
    rating: {
      avg: { type: Number, default: 0 },
      count: { type: Number, default: 0 }
    },
    isBlocked: { type: Boolean, default: false }
  },
  { timestamps: true }
);

userSchema.index({ location: "2dsphere" });

export const User = mongoose.model("User", userSchema);
