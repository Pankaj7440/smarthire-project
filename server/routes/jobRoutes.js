const router = require("express").Router();
const Job = require("../models/Job");

// Create Job
router.post("/", async (req, res) => {
  const job = await Job.create(req.body);
  res.json(job);
});

// Get All Jobs
router.get("/", async (req, res) => {
  const jobs = await Job.find();
  res.json(jobs);
});

module.exports = router;

const Application = require("../models/Application");

// Candidate Apply Job
router.post("/apply", async (req, res) => {
  try {
    const { candidateId, jobId } = req.body;

    // Check if already applied
    const exists = await Application.findOne({ candidateId, jobId });
    if (exists) return res.status(400).json({ msg: "Already applied" });

    const application = await Application.create({ candidateId, jobId });
    res.json(application);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

