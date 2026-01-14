const Job = require("../../models/Job.model");
const User = require("../../models/User.model");

exports.getHomeStats = async (req, res) => {
  try {
    const liveJobs = await Job.countDocuments({ status: "Active" });
    const companies = await User.countDocuments({ role: "EMPLOYER" });
    const candidates = await User.countDocuments({ role: "CANDIDATE" });

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const newJobs = await Job.countDocuments({
      createdAt: { $gte: sevenDaysAgo },
    });

    res.json({
      success: true,
      stats: {
        liveJobs,
        companies,
        candidates,
        newJobs,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to load stats",
    });
  }
};
