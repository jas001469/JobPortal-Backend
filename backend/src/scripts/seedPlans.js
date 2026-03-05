const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../../.env") });

const Plan = require("../models/Plan.model");

const plans = [
  // Employer Plans
  {
    name: "Recruit Basic",
    type: "employer",
    isFree: false,
    monthly: 999,
    yearly: 9590,
    discount: "FREE LAUNCH OFFER",
    popular: false,
    features: [
      { label: "30 job postings", enabled: true },
      { label: "3 featured jobs", enabled: true },
      { label: "Job displayed for 15 days", enabled: true },
      { label: "Email support", enabled: false },
      { label: "Employee record management", enabled: false },
      { label: "Access to core HR features", enabled: false },
    ],
    perks: {
      jobPostings: 30,
      featuredJobs: 3,
      jobDisplayDays: 15,
      emailSupport: false,
      employeeManagement: false,
      hrFeatures: false,
    },
  },
  {
    name: "Talent Pro",
    type: "employer",
    isFree: false,
    monthly: 1599,
    yearly: 15350,
    discount: null,
    popular: true,
    features: [
      { label: "40 job postings", enabled: true },
      { label: "5 featured jobs", enabled: true },
      { label: "Job displayed for 30 days", enabled: true },
      { label: "Email support", enabled: true },
      { label: "Employee record management", enabled: false },
      { label: "Access to core HR features", enabled: false },
    ],
    perks: {
      jobPostings: 40,
      featuredJobs: 5,
      jobDisplayDays: 30,
      emailSupport: true,
      employeeManagement: false,
      hrFeatures: false,
    },
  },
  {
    name: "HR Master",
    type: "employer",
    isFree: false,
    monthly: 1999,
    yearly: 19190,
    discount: null,
    popular: false,
    features: [
      { label: "50 job postings", enabled: true },
      { label: "10 featured jobs", enabled: true },
      { label: "Job displayed for 60 days", enabled: true },
      { label: "Email support", enabled: true },
      { label: "Employee record management", enabled: true },
      { label: "Access to core HR features", enabled: true },
    ],
    perks: {
      jobPostings: 50,
      featuredJobs: 10,
      jobDisplayDays: 60,
      emailSupport: true,
      employeeManagement: true,
      hrFeatures: true,
    },
  },
  // Candidate Plans
  {
    name: "Standard",
    type: "candidate",
    isFree: true,
    monthly: 0,
    yearly: 0,
    discount: null,
    popular: false,
    features: [
      { label: "Free registration", enabled: true },
      { label: "Unlimited free job search", enabled: true },
      { label: "Save Jobs", enabled: true },
      { label: "Email support", enabled: false },
      { label: "Resume builder", enabled: false },
    ],
    perks: {
      resumeBuilder: false,
      savedJobs: true,
      emailSupport: false,
    },
  },
  {
    name: "Advantage",
    type: "candidate",
    isFree: false,
    monthly: 149,
    yearly: 1430,
    discount: null,
    popular: true,
    features: [
      { label: "Free registration", enabled: true },
      { label: "Unlimited free job search", enabled: true },
      { label: "Save Jobs", enabled: true },
      { label: "Email support", enabled: true },
      { label: "Resume builder", enabled: false },
    ],
    perks: {
      resumeBuilder: false,
      savedJobs: true,
      emailSupport: true,
    },
  },
  {
    name: "Premium",
    type: "candidate",
    isFree: false,
    monthly: 249,
    yearly: 2390,
    discount: null,
    popular: false,
    features: [
      { label: "Free registration", enabled: true },
      { label: "Unlimited free job search", enabled: true },
      { label: "Save Jobs", enabled: true },
      { label: "Email support", enabled: true },
      { label: "Resume builder", enabled: true },
    ],
    perks: {
      resumeBuilder: true,
      savedJobs: true,
      emailSupport: true,
    },
  },
];

const seedPlans = async () => {
  try {
    console.log("MONGO_URI:", process.env.MONGO_URI ? "Found ✓" : "Not found ✗");
    
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is not defined in environment variables");
    }

    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");
    console.log("📊 Database name:", mongoose.connection.name);
    
    // Check if plans already exist
    const existingCount = await Plan.countDocuments();
    console.log(`📊 Existing plans in database: ${existingCount}`);

    if (existingCount > 0) {
      console.log("🗑️  Clearing existing plans...");
      await Plan.deleteMany({});
      console.log("✅ Cleared existing plans");
    }

    // Insert new plans
    console.log("📝 Inserting new plans...");
    const result = await Plan.insertMany(plans);
    console.log(`✅ Inserted ${result.length} plans successfully`);
    console.log(`📊 Plans by type:`);
    console.log(`   - Employer: ${result.filter(p => p.type === 'employer').length}`);
    console.log(`   - Candidate: ${result.filter(p => p.type === 'candidate').length}`);

    // Verify insertion
    const verifyCount = await Plan.countDocuments();
    console.log(`✅ Verification - Total plans in database: ${verifyCount}`);

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding plans:", error.message);
    process.exit(1);
  }
};

seedPlans();