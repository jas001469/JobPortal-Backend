const express = require("express");
const router = express.Router();
const planController = require("./plan.controller.js");
const { authenticateToken } = require("../../middlewares/auth.js");

// Public routes
router.get("/", planController.getAllPlans);
router.get("/type/:type", planController.getPlansByType);

// Admin routes (you may want to add admin middleware)
router.post("/", authenticateToken, planController.createPlan);
router.put("/:id", authenticateToken, planController.updatePlan);
router.delete("/:id", authenticateToken, planController.deletePlan);

module.exports = router;