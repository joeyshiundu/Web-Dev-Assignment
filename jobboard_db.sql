/*!999999\- enable the sandbox mode */ 
-- MariaDB dump 10.19  Distrib 10.11.8-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: job_board_db
-- ------------------------------------------------------
-- Server version	10.11.8-MariaDB-0ubuntu0.24.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Jobs`
--

DROP TABLE IF EXISTS `Jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Jobs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `company` varchar(255) NOT NULL,
  `location` varchar(255) NOT NULL,
  `salary` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `postedAt` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Jobs`
--

LOCK TABLES `Jobs` WRITE;
/*!40000 ALTER TABLE `Jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `Jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `applications`
--

DROP TABLE IF EXISTS `applications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `applications` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `job_id` int(11) NOT NULL,
  `Name` varchar(100) NOT NULL,
  `user_id` int(11) NOT NULL,
  `cover_letter` text DEFAULT NULL,
  `status` varchar(20) DEFAULT 'pending',
  `applied_at` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `fk_job` (`job_id`),
  KEY `fk_user` (`user_id`),
  CONSTRAINT `fk_job` FOREIGN KEY (`job_id`) REFERENCES `jobs` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `chk_status` CHECK (`status` in ('pending','reviewed','accepted','rejected'))
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `applications`
--

LOCK TABLES `applications` WRITE;
/*!40000 ALTER TABLE `applications` DISABLE KEYS */;
INSERT INTO `applications` VALUES
(1,1,'',103,'I am excited to apply for the Software Engineer position at Tech Corp. I have 3 years of experience in full-stack development.','pending','2025-03-20 19:15:10'),
(2,2,'',104,'I am interested in the Data Analyst role at Data Insights. I have a strong background in data visualization and statistical analysis.','pending','2025-03-20 19:15:10'),
(3,3,'',103,'I would love to join Tech Corp as a Product Manager. I have experience in agile project management and product lifecycle development.','pending','2025-03-20 19:15:10'),
(4,4,'',107,'I am applying for the Frontend Developer position at Web Solutions. I specialize in React and responsive design.','pending','2025-03-20 19:15:10'),
(5,5,'',108,'I am excited about the Backend Developer role at Code Masters. I have expertise in Node.js and database optimization.','pending','2025-03-20 19:15:10'),
(6,6,'',110,'I am applying for the DevOps Engineer position at Cloud Innovators. I have experience with AWS and CI/CD pipelines.','pending','2025-03-20 19:15:10'),
(7,7,'',112,'I am interested in the UX Designer role at Creative Minds. I have a portfolio showcasing my work on user-centered design.','pending','2025-03-20 19:15:10'),
(8,8,'',114,'I would like to apply for the Mobile App Developer position at App Builders. I have experience with Flutter and React Native.','pending','2025-03-20 19:15:10'),
(9,9,'',116,'I am applying for the Data Scientist role at AI Insights. I have a strong background in machine learning and data modeling.','pending','2025-03-20 19:15:10'),
(10,10,'',118,'I am excited to apply for the Cybersecurity Specialist position at Secure Tech. I have experience in network security and threat analysis.','pending','2025-03-20 19:15:10');
/*!40000 ALTER TABLE `applications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jobs`
--

DROP TABLE IF EXISTS `jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `jobs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `company` varchar(255) NOT NULL,
  `location` varchar(255) NOT NULL,
  `salary` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `postedAt` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jobs`
--

LOCK TABLES `jobs` WRITE;
/*!40000 ALTER TABLE `jobs` DISABLE KEYS */;
INSERT INTO `jobs` VALUES
(1,'Software Engineer','Tech Corp','New York','90000','Develop and maintain software applications.',NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00'),
(2,'Data Analyst','Data Insights','San Francisco','75000','Analyze data and provide insights.',NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00'),
(3,'Product Manager','Tech Corp','Remote','110000','Manage product development lifecycle.',NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00'),
(4,'Frontend Developer','Web Solutions','Chicago','85000','Build responsive and user-friendly web interfaces.',NULL,'2025-03-20 21:56:19','2025-03-20 21:56:19'),
(5,'Backend Developer','Code Masters','Austin','95000','Develop server-side logic and database integration.',NULL,'2025-03-20 21:56:19','2025-03-20 21:56:19'),
(6,'DevOps Engineer','Cloud Innovators','Seattle','100000','Manage infrastructure and CI/CD pipelines.',NULL,'2025-03-20 21:56:19','2025-03-20 21:56:19'),
(7,'UX Designer','Creative Minds','Los Angeles','80000','Design intuitive and engaging user experiences.',NULL,'2025-03-20 21:56:19','2025-03-20 21:56:19'),
(8,'Mobile App Developer','App Builders','Boston','90000','Develop cross-platform mobile applications.',NULL,'2025-03-20 21:56:19','2025-03-20 21:56:19'),
(9,'Data Scientist','AI Insights','San Diego','120000','Build machine learning models and analyze data.',NULL,'2025-03-20 21:56:19','2025-03-20 21:56:19'),
(10,'Cybersecurity Specialist','Secure Tech','Washington, D.C.','110000','Protect systems and networks from cyber threats.',NULL,'2025-03-20 21:56:19','2025-03-20 21:56:19'),
(11,'Technical Writer','Doc Experts','Remote','70000','Create technical documentation and user guides.',NULL,'2025-03-20 21:56:19','2025-03-20 21:56:19'),
(12,'QA Engineer','Quality First','Denver','75000','Test software to ensure quality and reliability.',NULL,'2025-03-20 21:56:19','2025-03-20 21:56:19'),
(13,'Sales Engineer','Tech Sales','Atlanta','85000','Bridge the gap between sales and engineering teams.',NULL,'2025-03-20 21:56:19','2025-03-20 21:56:19'),
(14,'Cloud Architect','Sky High Tech','Dallas','130000','Design and implement cloud infrastructure solutions.',NULL,'2025-03-20 21:56:19','2025-03-20 21:56:19'),
(15,'Full Stack Developer','Code Fusion','Portland','95000','Work on both frontend and backend development.',NULL,'2025-03-20 21:56:19','2025-03-20 21:56:19'),
(16,'Machine Learning Engineer','AI Innovators','San Jose','125000','Develop and deploy machine learning models.',NULL,'2025-03-20 21:56:19','2025-03-20 21:56:19'),
(17,'IT Support Specialist','Tech Helpers','Miami','60000','Provide technical support and troubleshooting.',NULL,'2025-03-20 21:56:19','2025-03-20 21:56:19'),
(18,'Business Analyst','Strategy Pros','Philadelphia','80000','Analyze business processes and recommend improvements.',NULL,'2025-03-20 21:56:19','2025-03-20 21:56:19'),
(19,'Network Engineer','Connectivity Experts','Phoenix','90000','Design and maintain network infrastructure.',NULL,'2025-03-20 21:56:19','2025-03-20 21:56:19'),
(20,'UI Designer','Design Studio','San Francisco','85000','Create visually appealing user interfaces.',NULL,'2025-03-20 21:56:19','2025-03-20 21:56:19'),
(21,'Software Developer','Kilimanjaro','Kenya','90000','Maintanance of Safaricom Applications','2025-03-24 17:21:12','2025-03-24 17:21:12','2025-03-24 17:21:12'),
(22,'Janitor','Kilimanjaro','Kenya','60000','Cleaning and Servicing','2025-03-24 21:26:54','2025-03-24 21:26:54','2025-03-24 21:26:54');
/*!40000 ALTER TABLE `jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `email_2` (`email`),
  UNIQUE KEY `email_3` (`email`),
  UNIQUE KEY `email_4` (`email`),
  UNIQUE KEY `email_5` (`email`),
  UNIQUE KEY `email_6` (`email`),
  UNIQUE KEY `email_7` (`email`),
  UNIQUE KEY `email_8` (`email`),
  UNIQUE KEY `email_9` (`email`),
  UNIQUE KEY `email_10` (`email`),
  UNIQUE KEY `email_11` (`email`),
  UNIQUE KEY `email_12` (`email`),
  UNIQUE KEY `email_13` (`email`),
  UNIQUE KEY `email_14` (`email`),
  UNIQUE KEY `email_15` (`email`),
  UNIQUE KEY `email_16` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=122 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES
(101,'john.doe@example.com','12345','0000-00-00 00:00:00','0000-00-00 00:00:00'),
(102,'jane.smith@example.com','12345','0000-00-00 00:00:00','0000-00-00 00:00:00'),
(103,'alice.johnson@example.com','12345','0000-00-00 00:00:00','0000-00-00 00:00:00'),
(104,'bob.brown@example.com','12345','0000-00-00 00:00:00','0000-00-00 00:00:00'),
(105,'emily.davis@example.com','12345','0000-00-00 00:00:00','0000-00-00 00:00:00'),
(106,'michael.wilson@example.com','12345','0000-00-00 00:00:00','0000-00-00 00:00:00'),
(107,'sarah.martinez@example.com','12345','0000-00-00 00:00:00','0000-00-00 00:00:00'),
(108,'david.anderson@example.com','12345','0000-00-00 00:00:00','0000-00-00 00:00:00'),
(109,'laura.garcia@example.com','12345','0000-00-00 00:00:00','0000-00-00 00:00:00'),
(110,'james.rodriguez@example.com','12345','0000-00-00 00:00:00','0000-00-00 00:00:00'),
(111,'linda.hernandez@example.com','12345','0000-00-00 00:00:00','0000-00-00 00:00:00'),
(112,'william.martinez@example.com','12345','0000-00-00 00:00:00','0000-00-00 00:00:00'),
(113,'karen.lee@example.com','12345','0000-00-00 00:00:00','0000-00-00 00:00:00'),
(114,'richard.gonzalez@example.com','12345','0000-00-00 00:00:00','0000-00-00 00:00:00'),
(115,'susan.perez@example.com','','0000-00-00 00:00:00','0000-00-00 00:00:00'),
(116,'joseph.taylor@example.com','','0000-00-00 00:00:00','0000-00-00 00:00:00'),
(117,'maria.moore@example.com','','0000-00-00 00:00:00','0000-00-00 00:00:00'),
(118,'thomas.jackson@example.com','','0000-00-00 00:00:00','0000-00-00 00:00:00'),
(119,'nancy.white@example.com','','0000-00-00 00:00:00','0000-00-00 00:00:00'),
(120,'charles.harris@example.com','','0000-00-00 00:00:00','0000-00-00 00:00:00'),
(121,'shiundujoey@gmail.com','12345','2025-03-23 07:36:43','2025-03-23 07:36:43');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-03-25  9:54:02
