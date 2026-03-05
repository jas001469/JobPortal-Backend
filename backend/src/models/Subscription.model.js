const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema(
  {
    employer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true, // One subscription per employer
    },
    plan: {
      name: {
        type: String,
        enum: ["Recruit Basic", "Talent Pro", "HR Master"],
        required: true,
      },
      jobPostings: {
        type: Number,
        required: true,
      },
      featuredJobs: {
        type: Number,
        required: true,
      },
      jobDisplayDays: {
        type: Number,
        required: true,
      },
      emailSupport: {
        type: Boolean,
        default: false,
      },
      employeeManagement: {
        type: Boolean,
        default: false,
      },
      hrFeatures: {
        type: Boolean,
        default: false,
      },
    },
    status: {
      type: String,
      enum: ["active", "expired", "cancelled"],
      default: "active",
    },
    startDate: {
      type: Date,
      default: Date.now,
    },
    expiryDate: {
      type: Date,
      default: null,
    },
    promoCodeApplied: {
      type: String,
      default: null,
    },
    jobsPosted: {
      type: Number,
      default: 0,
    },
    featuredJobsUsed: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// Method to check if employer can post more jobs
subscriptionSchema.methods.canPostJob = function() {
  return this.jobsPosted < this.plan.jobPostings;
};

// Method to increment jobs posted
subscriptionSchema.methods.incrementJobsPosted = function() {
  this.jobsPosted += 1;
  return this.save();
};

// Method to check if employer can post featured job
subscriptionSchema.methods.canPostFeaturedJob = function() {
  return this.featuredJobsUsed < this.plan.featuredJobs;
};

// Method to increment featured jobs used
subscriptionSchema.methods.incrementFeaturedJobs = function() {
  this.featuredJobsUsed += 1;
  return this.save();
};

module.exports = mongoose.model("Subscription", subscriptionSchema);