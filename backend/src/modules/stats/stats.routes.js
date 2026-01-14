const express = require("express");
const router = express.Router();
const { getHomeStats } = require("./stats.controller");

router.get("/home", getHomeStats);

module.exports = router;
