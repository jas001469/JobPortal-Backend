const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["CANDIDATE", "EMPLOYER", "ADMIN"],
      default: "CANDIDATE",
    },
    
    // Candidate-specific fields
    phone: {
      type: String,
      trim: true,
    },
    address: {
      type: String,
      trim: true,
    },
    city: {
      type: String,
      trim: true,
    },
    state: {
      type: String,
      trim: true,
    },
    country: {
      type: String,
      trim: true,
    },
    pincode: {
      type: String,
      trim: true,
    },
    // resume: {
    //   type: String, // URL to uploaded resume
    // },
    skills: {
      type: [String],
      default: [],
    },
    education: [
      {
        degree: String,
        institution: String,
        year: String,
        grade: String,
      }
    ],
    experience: [
      {
        title: String,
        company: String,
        location: String,
        startDate: Date,
        endDate: Date,
        current: Boolean,
        description: String,
      }
    ],
    summary: {
      type: String,
      trim: true,
    },
    
    // Employer-specific fields
    company: {
      type: String,
      trim: true,
    },
    website: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);