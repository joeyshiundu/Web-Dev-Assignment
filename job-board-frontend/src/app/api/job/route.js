const express = require("express");
const router = express.Router();
const Job = require("../models/Job"); // Ensure you have a Job model

// @route   GET /api/jobs
// @desc    Get all jobs
// @access  Public
router.get("/jobs", async (req, res) => {
  try {
    const jobs = await Job.find();
    res.json(jobs);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// @route   GET /api/jobs/:id
// @desc    Get a single job by ID
// @access  Public
router.get("/jobs/:id", async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });
    res.json(job);
  } catch (error) {
    console.error("Error fetching job:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// @route   POST /api/jobs
// @desc    Create a new job listing
// @access  Public (Change to Private with authentication)
router.post("/jobs", async (req, res) => {
  try {
    const { title, company, location, salary } = req.body;
    const newJob = new Job({ title, company, location, salary });
    await newJob.save();
    res.status(201).json(newJob);
  } catch (error) {
    console.error("Error adding job:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// @route   DELETE /api/jobs/:id
// @desc    Delete a job listing
// @access  Public (Should be Private with authentication)
router.delete("/jobs/:id", async (req, res) => {
  try {
    await Job.findByIdAndDelete(req.params.id);
    res.json({ message: "Job deleted successfully" });
  } catch (error) {
    console.error("Error deleting job:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
