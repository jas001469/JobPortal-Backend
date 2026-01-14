const express = require("express");
const router = express.Router();
const candidateController = require("./candidate.controller.js");
const { authenticateToken } = require("../../middlewares/auth.js");
const upload = require("../../config/upload.js");

// Protected routes for candidates only
router.use(authenticateToken);

router.get("/profile", candidateController.getCandidateProfile);
router.put("/profile", candidateController.updateCandidateProfile);
router.post("/upload-resume", upload.single("resume"), candidateController.uploadResume);
router.get("/applications", candidateController.getCandidateApplications);

module.exports = router;