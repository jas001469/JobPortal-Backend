const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const path = require("path");
const authRoutes = require("./modules/auth/auth.routes.js");
const jobRoutes = require("./modules/jobs/job.routes.js");
const candidateRoutes = require("./modules/candidate/candidate.routes.js");
const statsRoutes = require("./modules/stats/stats.routes");

const app = express();

// CORS configuration with wildcard for Vercel
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    // Allow localhost
    if (origin.startsWith('http://localhost:')) {
      return callback(null, true);
    }
    
    // Allow ALL Vercel deployments
    if (origin.endsWith('.vercel.app')) {
      return callback(null, true);
    }
    
    // You can also add your production domain once you have one
    // if (origin === 'https://yourdomain.com') {
    //   return callback(null, true);
    // }
    
    // Block other origins
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  optionsSuccessStatus: 200,
  exposedHeaders: ['Set-Cookie']
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

// Serve uploaded files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/candidate", candidateRoutes);
app.use("/api/stats", statsRoutes);

app.get("/api/health", (req, res) => {
  res.json({ status: "OK" });
});

module.exports = app;