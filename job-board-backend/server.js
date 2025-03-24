require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { Sequelize, DataTypes } = require("sequelize");
const winston = require("winston");
const jwt = require("jsonwebtoken");

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

// ✅ User Model
const User = sequelize.define(
  "User",
  {
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
  },
  { tableName: "users" }
);

// ✅ Job Model
const Job = sequelize.define(
  "Job",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true, // ✅ Automatically generates an ID
      primaryKey: true,
    },
    title: { type: DataTypes.STRING, allowNull: false },
    company: { type: DataTypes.STRING, allowNull: false },
    location: { type: DataTypes.STRING, allowNull: false },
    salary: { type: DataTypes.STRING },
    description: { type: DataTypes.TEXT },
    postedAt: { type: DataTypes.DATE, defaultValue: Sequelize.NOW },
  },
  { tableName: "jobs" }
);

// Sync Database
sequelize
  .sync({ alter: true }) // Use `alter: true` cautiously in production
  .then(() => logger.info("Database & tables ready"))
  .catch((err) => logger.error("Error syncing database:", err));

// Routes

app.post("/jobs", async (req, res) => {
  try {
    logger.info("POST /jobs");
    const { title, company, location, salary, description } = req.body;

    if (!title || !company || !location || !description) {
      return res.status(400).json({ error: "All fields except salary are required" });
    }

    const newJob = await Job.create({ title, company, location, salary, description });
    res.status(201).json(newJob);
  } catch (error) {
    logger.error("Error creating job:", error);
    res.status(500).json({ error: error.message });
  }
});


app.get("/", (req, res) => {
  res.send("Job Board API is running!");
});

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

// ✅ Get a Single Job by ID
app.get("/jobs/:id", async (req, res) => {
  try {
    logger.info(`GET /jobs/${req.params.id}`);
    const job = await Job.findByPk(req.params.id);

    if (!job) {
      return res.status(404).json({ error: "Job not found" });
    }

    res.json(job);
  } catch (error) {
    logger.error(`Error getting job with ID ${req.params.id}:`, error);
    res.status(500).json({ error: error.message });
  }
});


// ✅ Register Route 
app.post("/api/auth/register", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Create new user without hashing password
    const newUser = await User.create({ email, password });

    res.status(201).json({ message: "User registered successfully", userId: newUser.id });
  } catch (error) {
    logger.error("Error registering user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ✅ Login Route with JWT
app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    // Find user in the database
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Directly compare plain text passwords
    if (password !== user.password) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate JWT Token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Start Server
app.listen(PORT, () => logger.info(`Server running on port ${PORT}`));
