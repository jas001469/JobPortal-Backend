// // const mongoose = require("mongoose");

// const jobSchema = new mongoose.Schema(
//   {
//     title: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     company: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     location: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     salary: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     type: {
//       type: String,
//       enum: ["Full-time", "Part-time", "Contract", "Internship", "Remote"],
//       required: true,
//     },
//     category: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     description: {
//       type: String,
//       required: true,
//     },
//     requirements: {
//       type: [String], // Array of strings
//       default: [],
//     },
//     skills: {
//       type: [String], // Array of strings
//       default: [],
//     },
//     experience: {
//       type: String,
//       required: true,
//     },
//     education: {
//       type: String,
//       required: true,
//     },
//     employer: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//     status: {
//       type: String,
//       enum: ["Active", "Closed", "Draft"],
//       default: "Active",
//     },
//     applications: [
//       {
//         candidate: {
//           type: mongoose.Schema.Types.ObjectId,
//           ref: "User",
//         },
//         appliedAt: {
//           type: Date,
//           default: Date.now,
//         },
//         status: {
//           type: String,
//           enum: ["Pending", "Reviewed", "Accepted", "Rejected"],
//           default: "Pending",
//         },
//         coverLetter: String,
//       },
//     ],
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Job", jobSchema);


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
      default: "Full-time", // Changed from required
    },
    category: {
      type: String,
      trim: true,
      default: "", // Changed from required
    },
    description: {
      type: String,
      default: "", // Changed from required
    },
    requirements: {
      type: [String],
      default: [],
    },
    skills: {
      type: [String],
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
    // New field: Job deadline
    deadline: {
      type: Date,
      default: null, // Optional field
    },
    // Additional links fields
    applicationLink: {
      type: String,
      trim: true,
      default: "",
    },
    companyWebsite: {
      type: String,
      trim: true,
      default: "",
    },
    jobReferenceLink: {
      type: String,
      trim: true,
      default: "",
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