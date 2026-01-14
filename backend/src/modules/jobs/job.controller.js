const Job = require("../../models/Job.model.js");
const User = require("../../models/User.model.js");

// Get all active jobs (public)
exports.getAllJobs = async (req, res) => {
  try {
    const { category, type, location, search, page = 1, limit = 10 } = req.query;
    
    let query = { status: "Active" };
    
    // Apply filters
    if (category) query.category = category;
    if (type) query.type = type;
    if (location) query.location = new RegExp(location, 'i');
    if (search) {
      query.$or = [
        { title: new RegExp(search, 'i') },
        { company: new RegExp(search, 'i') },
        { description: new RegExp(search, 'i') },
      ];
    }
    
    const skip = (page - 1) * limit;
    
    const jobs = await Job.find(query)
      .populate("employer", "name email")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));
    
    const total = await Job.countDocuments(query);
    
    res.json({
      success: true,
      jobs,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch jobs",
      error: error.message,
    });
  }
};

// Get single job by ID
exports.getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate("employer", "name email company");
    
    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }
    
    res.json({
      success: true,
      job,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch job",
      error: error.message,
    });
  }
};

// Create new job (employer only)
exports.createJob = async (req, res) => {
  try {
    // Check if user is employer
    const user = await User.findById(req.user.id);
    if (user.role !== "EMPLOYER") {
      return res.status(403).json({
        success: false,
        message: "Only employers can post jobs",
      });
    }
    
    const jobData = {
      ...req.body,
      employer: req.user.id,
    };
    
    const job = await Job.create(jobData);
    
    res.status(201).json({
      success: true,
      message: "Job posted successfully",
      job,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to post job",
      error: error.message,
    });
  }
};

// Update job (employer only)
exports.updateJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    
    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }
    
    // Check if user owns this job
    if (job.employer.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to update this job",
      });
    }
    
    const updatedJob = await Job.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    
    res.json({
      success: true,
      message: "Job updated successfully",
      job: updatedJob,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update job",
      error: error.message,
    });
  }
};

// Delete job (employer only)
exports.deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    
    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }
    
    // Check if user owns this job
    if (job.employer.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to delete this job",
      });
    }
    
    await Job.findByIdAndDelete(req.params.id);
    
    res.json({
      success: true,
      message: "Job deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete job",
      error: error.message,
    });
  }
};

// Get jobs by category
exports.getJobsByCategory = async (req, res) => {
  try {
    const jobs = await Job.find({
      category: req.params.category,
      status: "Active",
    }).populate("employer", "name").sort({ createdAt: -1 });
    
    res.json({
      success: true,
      jobs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch jobs by category",
      error: error.message,
    });
  }
};

// Apply for job (candidate only)
exports.applyForJob = async (req, res) => {
  try {
    // Check if user is candidate
    const user = await User.findById(req.user.id);
    if (user.role !== "CANDIDATE") {
      return res.status(403).json({
        success: false,
        message: "Only candidates can apply for jobs",
      });
    }

    const job = await Job.findById(req.params.id);
    
    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    // Check if job is active
    if (job.status !== "Active") {
      return res.status(400).json({
        success: false,
        message: "This job is no longer accepting applications",
      });
    }

    // Check if already applied
    const alreadyApplied = job.applications.some(
      (app) => app.candidate.toString() === req.user.id
    );
    
    if (alreadyApplied) {
      return res.status(400).json({
        success: false,
        message: "You have already applied for this job",
      });
    }

    // Check if candidate has resume
    // if (!user.resume) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "Please upload your resume before applying",
    //   });
    // }

    // Add application with candidate details
    const applicationData = {
      candidate: req.user.id,
      coverLetter: req.body.coverLetter || "",
      candidateName: user.name,
      candidateEmail: user.email,
      candidatePhone: user.phone || "",
      candidateResume: user.resume || "",
      appliedAt: new Date(),
    };

    job.applications.push(applicationData);
    
    await job.save();

    res.json({
      success: true,
      message: "Application submitted successfully",
      application: applicationData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to apply for job",
      error: error.message,
    });
  }
};

// Get employer's jobs
exports.getEmployerJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ employer: req.user.id })
      .populate("applications.candidate", "name email")
      .sort({ createdAt: -1 });

    res.json({ success: true, jobs });
  }  catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch your jobs",
      error: error.message,
    });
  }
};

// Get applications for a specific job
exports.getJobApplications = async (req, res) => {
  try {
    const job = await Job.findById(req.params.jobId).populate(
      "applications.candidate",
      "name email"
    );
    
    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }
    
    // Check if user owns this job
    if (job.employer.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to view applications",
      });
    }
    
    res.json({
      success: true,
      applications: job.applications,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch applications",
      error: error.message,
    });
  }
};