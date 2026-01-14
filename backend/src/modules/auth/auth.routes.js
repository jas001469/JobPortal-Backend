const express = require("express");
const { register, login, getUserProfile, logout } = require("./auth.controller.js");
const { authenticateToken } = require("../../middlewares/auth.js");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", authenticateToken, getUserProfile);
router.post("/logout", authenticateToken, logout);

module.exports = router;