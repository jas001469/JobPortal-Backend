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

// You can remove the create, update, delete functions since plans are now constants