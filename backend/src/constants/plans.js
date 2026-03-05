// Plan perks configuration (used for subscriptions)
const PLAN_PERKS = {
  "Recruit Basic": {
    jobPostings: 30,
    featuredJobs: 3,
    jobDisplayDays: 15,
    emailSupport: false,
    employeeManagement: false,
    hrFeatures: false
  },
  "Talent Pro": {
    jobPostings: 5,
    featuredJobs: 5,
    jobDisplayDays: 30,
    emailSupport: true,
    employeeManagement: false,
    hrFeatures: false
  },
  "HR Master": {
    jobPostings: 50,
    featuredJobs: 10,
    jobDisplayDays: 60,
    emailSupport: true,
    employeeManagement: true,
    hrFeatures: true
  }
};

// Plan display data for frontend
const PLANS = {
  employer: [
    {
      id: "recruit-basic",
      name: "Recruit Basic",
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
    },
    {
      id: "talent-pro",
      name: "Talent Pro",
      isFree: false,
      monthly: 1599,
      yearly: 15350,
      discount: null,
      popular: true,
      features: [
        { label: "5 job postings", enabled: true },
        { label: "5 featured jobs", enabled: true },
        { label: "Job displayed for 30 days", enabled: true },
        { label: "Email support", enabled: true },
        { label: "Employee record management", enabled: false },
        { label: "Access to core HR features", enabled: false },
      ],
    },
    {
      id: "hr-master",
      name: "HR Master",
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
    },
  ],
  candidate: [
    {
      id: "standard",
      name: "Standard",
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
    },
    {
      id: "advantage",
      name: "Advantage",
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
    },
    {
      id: "premium",
      name: "Premium",
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
    },
  ],
};

module.exports = { PLAN_PERKS, PLANS };