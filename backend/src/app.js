const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const path = require("path");
const authRoutes = require("./modules/auth/auth.routes.js");
const jobRoutes = require("./modules/jobs/job.routes.js");
const candidateRoutes = require("./modules/candidate/candidate.routes.js"); // ADD THIS
const statsRoutes = require("./modules/stats/stats.routes");

const app = express();

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

// Serve uploaded files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/candidate", candidateRoutes); // ADD THIS

app.use("/api/stats", statsRoutes);

app.get("/api/health", (req, res) => {
  res.json({ status: "OK" });
});

module.exports = app;