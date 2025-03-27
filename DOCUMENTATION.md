# Job Board Application Documentation
This project was done by our group as part of our school's programming assignment . The project is a job board application where users can create an account, log in and view job postings .
## Project Overview
The Job Board Application is a web-based platform that connects job seekers with employers. Built using Next.js for the frontend and Express.js with Sequelize for the backend, this application allows users to post job listings, apply for jobs, and manage their applications.

### Technologies Used
- **Frontend:** Next.js, React
- **Backend:** Node.js, Express.js, Sequelize
- **Database:** MariaDB
- **Authentication:** JWT
- **Logging:** Winston

## Backend Documentation

### Server Setup
The backend server is set up in `server.js`. It includes middleware for handling JSON requests and CORS, a connection to the MariaDB database using Sequelize, and a logging mechanism using Winston.

### Models
- **User Model:**
  - `email`: String, required, unique
  - `password`: String, required

- **Job Model:**
  - `id`: Integer, auto-increment, primary key
  - `title`: String, required
  - `company`: String, required
  - `location`: String, required
  - `salary`: String
  - `description`: Text
  - `postedAt`: Date, default to current date

- **Application Model:**
  - `id`: Integer, auto-increment, primary key
  - `job_id`: Integer, required, references Job
  - `email`: String, required
  - `cover_letter`: Text, required
  - `status`: Enum (pending, reviewed, accepted, rejected), default to 'pending'
  - `applied_at`: Date, default to current date

### API Endpoints
- **GET /**: Root route, confirms the API is running.
- **POST /jobs**: Create a new job listing.
- **GET /jobs**: Retrieve all job listings.
- **GET /jobs/:id**: Retrieve a specific job by ID.
- **POST /api/applications**: Submit a job application.
- **GET /api/applications**: Retrieve applications for a specific job.
- **POST /api/auth/register**: Register a new user.
- **POST /api/auth/login**: Authenticate a user and return a JWT.

## Frontend Documentation

### Project Structure
The frontend is organized into the following key directories:
- **src/app**: Contains the main application files, including pages and components.
- **components**: Reusable components such as Navbar, JobCard, and Footer.
- **auth**: Authentication-related pages for login and registration.
- **jobs**: Pages related to job listings.

### Components
- **Navbar**: Navigation bar for the application.
- **JobCard**: Displays individual job listings.
- **Footer**: Footer component for the application layout.

### Pages
- **Homepage (`page.js`)**: Displays job listings and allows users to search for jobs.
- **Dashboard (`dashboard/page.js`)**: Allows employers to post jobs and view their posted jobs.

## Installation and Setup
To set up the project locally, follow these steps:
1. Clone the repository.
2. Navigate to the backend directory and install dependencies:
   ```bash
   cd job-board-backend
   npm install
   ```
3. Set up environment variables in a `.env` file based on the provided `.env.example`.
4. Start the backend server:
   ```bash
   npm start
   ```
5. Navigate to the frontend directory and install dependencies:
   ```bash
   cd job-board-frontend
   npm install
   ```
6. Start the frontend development server:
   ```bash
   npm run dev
   ```

