const Subscription = require("../../models/Subscription.model.js");
const Job = require("../../models/Job.model.js");
const User = require("../../models/User.model.js");
const { PLAN_PERKS } = require("../../constants/plans.js");

// Get employer's subscription
exports.getSubscription = async (req, res) => {
  try {
    const subscription = await Subscription.findOne({ 
      employer: req.user.id,
      status: "active"
    });

    if (!subscription) {
      return res.status(404).json({ 
        success: false, 
        message: "No active subscription found" 
      });
    }

    res.json({
      success: true,
      subscription
    });
  } catch (error) {
    console.error("Error fetching subscription:", error);
    res.status(500).json({ 
      success: false, 
      message: "Failed to fetch subscription",
      error: error.message 
    });
  }
};

// Activate subscription with promo code
exports.activateSubscription = async (req, res) => {
  try {
    const { planName, promoCode } = req.body;

    // Check if user is employer
    const user = await User.findById(req.user.id);
    if (user.role !== "EMPLOYER") {
      return res.status(403).json({
        success: false,
        message: "Only employers can activate subscriptions",
      });
    }

    const perks = PLAN_PERKS[planName];
    if (!perks) {
      return res.status(400).json({ 
        success: false, 
        message: "Invalid plan" 
      });
    }

    // Check if employer already has an active subscription
    let subscription = await Subscription.findOne({ 
      employer: req.user.id
    });

    if (subscription) {
      // Update existing subscription
      subscription.plan = {
        name: planName,
        ...perks
      };
      subscription.status = "active";
      subscription.promoCodeApplied = promoCode;
      subscription.startDate = new Date();
      subscription.jobsPosted = 0; // Reset counter
      subscription.featuredJobsUsed = 0;
      await subscription.save();
    } else {
      // Create new subscription
      subscription = new Subscription({
        employer: req.user.id,
        plan: {
          name: planName,
          ...perks
        },
        status: "active",
        promoCodeApplied: promoCode
      });
      await subscription.save();
    }

    res.json({
      success: true,
      message: "Subscription activated successfully",
      subscription
    });
  } catch (error) {
    console.error("Error activating subscription:", error);
    res.status(500).json({ 
      success: false, 
      message: "Failed to activate subscription",
      error: error.message 
    });
  }
};

// Get employer's job posting stats
exports.getJobStats = async (req, res) => {
  try {
    const subscription = await Subscription.findOne({ 
      employer: req.user.id,
      status: "active"
    });

    if (!subscription) {
      return res.json({
        success: true,
        stats: {
          totalPosted: 0,
          featuredPosted: 0,
          activeJobs: 0,
          remaining: 0,
          total: 0
        }
      });
    }

    const totalPosted = subscription.jobsPosted;
    const featuredPosted = subscription.featuredJobsUsed;

    const activeJobs = await Job.countDocuments({ 
      employer: req.user.id,
      status: "Active" 
    });

    res.json({
      success: true,
      stats: {
        totalPosted,
        featuredPosted,
        activeJobs,
        remaining: subscription.plan.jobPostings - totalPosted,
        total: subscription.plan.jobPostings,
        plan: subscription.plan.name
      }
    });
  } catch (error) {
    console.error("Error fetching job stats:", error);
    res.status(500).json({ 
      success: false, 
      message: "Failed to fetch job stats",
      error: error.message 
    });
  }
};

// Check if employer can post a job
exports.canPostJob = async (req, res) => {
  try {
    const subscription = await Subscription.findOne({ 
      employer: req.user.id,
      status: "active"
    });

    if (!subscription) {
      return res.json({
        success: true,
        canPost: false,
        message: "No active subscription",
        remaining: 0,
        total: 0
      });
    }

    const canPost = subscription.canPostJob();

    res.json({
      success: true,
      canPost,
      remaining: subscription.plan.jobPostings - subscription.jobsPosted,
      total: subscription.plan.jobPostings,
      plan: subscription.plan.name
    });
  } catch (error) {
    console.error("Error checking posting limit:", error);
    res.status(500).json({ 
      success: false, 
      message: "Failed to check posting limit",
      error: error.message 
    });
  }
};