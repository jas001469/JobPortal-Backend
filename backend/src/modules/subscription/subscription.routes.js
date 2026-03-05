const express = require("express");
const router = express.Router();
const subscriptionController = require("./subscription.controller.js");
const { authenticateToken } = require("../../middlewares/auth.js");

// All subscription routes require authentication
router.get("/employer/subscription", authenticateToken, subscriptionController.getSubscription);
router.post("/employer/subscription/activate", authenticateToken, subscriptionController.activateSubscription);
router.get("/employer/jobs/stats", authenticateToken, subscriptionController.getJobStats);
router.get("/employer/can-post", authenticateToken, subscriptionController.canPostJob);

module.exports = router;