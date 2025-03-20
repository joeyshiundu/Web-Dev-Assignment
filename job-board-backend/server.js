require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { Sequelize, DataTypes } = require("sequelize");
const winston = require("winston");



// Debug logs to check environment variables
/*
console.log("MARIADB_HOST:", process.env.MARIADB_HOST);
console.log("MARIADB_DATABASE:", process.env.MARIADB_DATABASE);
console.log("MARIADB_USER:", process.env.MARIADB_USER);
console.log("MARIADB_PASSWORD:", process.env.MARIADB_PASSWORD);
console.log("PORT:", process.env.PORT);
*/

// Create a logger
const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: "error.log", level: "error" }),
    new winston.transports.File({ filename: "combined.log" }),
  ],
});

// Log environment variables for debugging
logger.info("DB_USERNAME:", process.env.DB_USERNAME);
logger.info("MARIADB_DATABASE:", process.env.MARIADB_DATABASE);

// Initialize Express App
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// MariaDB Connection using Sequelize
const sequelize = new Sequelize(
  process.env.MARIADB_DATABASE,
  process.env.MARIADB_USER,
  process.env.MARIADB_PASSWORD,
  {
    host: process.env.MARIADB_HOST,
    dialect: "mysql",
    logging: false, // Disable logging SQL queries
  }
);

// Test Database Connection
(async () => {
  try {
    await sequelize.authenticate();
    logger.info("MariaDB Connected");
  } catch (error) {
    logger.error("Database connection error:", error);
  }
})();

// Job Model
const Job = sequelize.define(
  "Job", // Model name
  {
    // Attributes
    title: { type: DataTypes.STRING, allowNull: false },
    company: { type: DataTypes.STRING, allowNull: false },
    location: { type: DataTypes.STRING, allowNull: false },
    salary: { type: DataTypes.STRING },
    description: { type: DataTypes.TEXT },
    postedAt: { type: DataTypes.DATE, defaultValue: Sequelize.NOW },
  },
  {
    tableName: "jobs", // Explicitly set the table name to 'jobs'
  }
);

// Sync Database
sequelize
  .sync({ alter: true }) // Creates/Updates tables
  .then(() => logger.info("Database & tables ready"))
  .catch((err) => logger.error("Error syncing database:", err));

// Routes
app.get("/", (req, res) => {
  logger.info("GET /");
  res.send("Job Board API is running!");
});logger.info("Environment variables loaded");
logger.info("Logger initialized");
logger.info("Express App initialized");
logger.info("Middleware initialized");
logger.info("MariaDB Connection initialized");
logger.info("Job Model defined");
logger.info("Database syncing...");
logger.info("Routes initialized");
logger.info("Server starting...");

// Get all jobs
app.get("/jobs", async (req, res) => {
  try {
    logger.info("GET /jobs");
    const jobs = await Job.findAll();
    res.json(jobs);
  } catch (error) {
    logger.error("Error getting jobs:", error);
    res.status(500).json({ error: error.message });
  }
});

// Post a new job
app.post("/jobs", async (req, res) => {
  try {
    logger.info("POST /jobs", { body: req.body });
    const { title, company, location, salary, description } = req.body;

    // Validate required fields
    if (!title || !company || !location) {
      return res.status(400).json({ error: "Title, company, and location are required" });
    }

    const newJob = await Job.create({ title, company, location, salary, description });
    res.status(201).json(newJob);
  } catch (error) {
    logger.error("Error posting job:", error);
    res.status(500).json({ error: error.message });
  }
});

// Start Server
app.listen(PORT, () => logger.info(`Server running on port ${PORT}`));