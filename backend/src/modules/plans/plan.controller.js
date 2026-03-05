const { PLANS } = require("../../constants/plans.js");

// Get all active plans
exports.getAllPlans = async (req, res) => {
  try {
    const { type } = req.query;
    
    let plans = [];
    if (type === "employer") {
      plans = PLANS.employer;
    } else if (type === "candidate") {
      plans = PLANS.candidate;
    } else {
      plans = [...PLANS.employer, ...PLANS.candidate];
    }
    
    res.json({
      success: true,
      plans,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch plans",
      error: error.message,
    });
  }
};

// Get plans by type (employer/candidate)
exports.getPlansByType = async (req, res) => {
  try {
    const { type } = req.params;
    
    let plans = [];
    if (type === "employer") {
      plans = PLANS.employer;
    } else if (type === "candidate") {
      plans = PLANS.candidate;
    } else {
      return res.status(400).json({
        success: false,
        message: "Invalid plan type. Use 'employer' or 'candidate'",
      });
    }
    
    res.json({
      success: true,
      plans,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch plans",
      error: error.message,
    });
  }
};

// Create a new plan (admin only)
exports.createPlan = async (req, res) => {
  try {
    const plan = await Plan.create(req.body);
    
    res.status(201).json({
      success: true,
      message: "Plan created successfully",
      plan,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create plan",
      error: error.message,
    });
  }
};

// Update a plan (admin only)
exports.updatePlan = async (req, res) => {
  try {
    const plan = await Plan.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    
    if (!plan) {
      return res.status(404).json({
        success: false,
        message: "Plan not found",
      });
    }
    
    res.json({
      success: true,
      message: "Plan updated successfully",
      plan,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update plan",
      error: error.message,
    });
  }
};

// Delete a plan (admin only)
exports.deletePlan = async (req, res) => {
  try {
    const plan = await Plan.findByIdAndDelete(req.params.id);
    
    if (!plan) {
      return res.status(404).json({
        success: false,
        message: "Plan not found",
      });
    }
    
    res.json({
      success: true,
      message: "Plan deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete plan",
      error: error.message,
    });
  }
};