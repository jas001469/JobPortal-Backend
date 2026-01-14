const express = require("express");
const router = express.Router();
const jobController = require("./job.controller.js");
const { authenticateToken } = require("../../middlewares/auth.js");

// Public routes
router.get("/", jobController.getAllJobs);
router.get("/:id", jobController.getJobById);
router.get("/category/:category", jobController.getJobsByCategory);

// Protected routes (employers only)
router.post("/", authenticateToken, jobController.createJob);
router.put("/:id", authenticateToken, jobController.updateJob);
router.delete("/:id", authenticateToken, jobController.deleteJob);

// Candidate routes
router.post("/:id/apply", authenticateToken, jobController.applyForJob);

// Employer dashboard routes
router.get("/employer/my-jobs", authenticateToken, jobController.getEmployerJobs);
router.get("/employer/applications/:jobId", authenticateToken, jobController.getJobApplications);

module.exports = router;