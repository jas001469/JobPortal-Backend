const User = require("../../models/User.model.js");

// Get candidate profile
exports.getCandidateProfile = async (req, res) => {
  try {
    const candidate = await User.findById(req.user.id).select("-password");
    
    if (!candidate) {
      return res.status(404).json({
        success: false,
        message: "Candidate not found",
      });
    }

    res.json({
      success: true,
      candidate,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch candidate profile",
      error: error.message,
    });
  }
};

// Update candidate profile
exports.updateCandidateProfile = async (req, res) => {
  try {
    const updateData = req.body;
    
    // Remove sensitive fields
    delete updateData.password;
    delete updateData.email;
    delete updateData.role;

    const candidate = await User.findByIdAndUpdate(
      req.user.id,
      updateData,
      { new: true, runValidators: true }
    ).select("-password");

    res.json({
      success: true,
      message: "Profile updated successfully",
      candidate,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update profile",
      error: error.message,
    });
  }
};

// Upload resume
exports.uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    const resumeUrl = `/uploads/resumes/${req.file.filename}`;
    
    await User.findByIdAndUpdate(req.user.id, {
      resume: resumeUrl,
    });

    res.json({
      success: true,
      message: "Resume uploaded successfully",
      resumeUrl,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to upload resume",
      error: error.message,
    });
  }
};

// Get candidate applications
exports.getCandidateApplications = async (req, res) => {
  try {
    // We'll need to query jobs where candidate has applied
    const Job = require("../../models/Job.model.js");
    
    const jobs = await Job.find({
      "applications.candidate": req.user.id,
    })
    .populate("employer", "name company")
    .sort({ "applications.appliedAt": -1 });

    // Extract applications
    const applications = [];
    jobs.forEach(job => {
      job.applications.forEach(app => {
        if (app.candidate.toString() === req.user.id) {
          applications.push({
            job: {
              _id: job._id,
              title: job.title,
              company: job.company,
              location: job.location,
              type: job.type,
            },
            application: app,
          });
        }
      });
    });

    res.json({
      success: true,
      applications,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch applications",
      error: error.message,
    });
  }
};