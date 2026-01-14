const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    company: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    salary: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      enum: ["Full-time", "Part-time", "Contract", "Internship", "Remote"],
      required: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    requirements: {
      type: [String], // Array of strings
      default: [],
    },
    skills: {
      type: [String], // Array of strings
      default: [],
    },
    experience: {
      type: String,
      required: true,
    },
    education: {
      type: String,
      required: true,
    },
    employer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["Active", "Closed", "Draft"],
      default: "Active",
    },
    applications: [
      {
        candidate: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        appliedAt: {
          type: Date,
          default: Date.now,
        },
        status: {
          type: String,
          enum: ["Pending", "Reviewed", "Accepted", "Rejected"],
          default: "Pending",
        },
        coverLetter: String,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", jobSchema);