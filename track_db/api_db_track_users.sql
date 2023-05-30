CREATE DATABASE  IF NOT EXISTS `api_db_track` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `api_db_track`;
-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: api_db_track
-- ------------------------------------------------------
-- Server version	8.0.33

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` text NOT NULL,
  `password` text NOT NULL,
  `email` varchar(45) NOT NULL,
  `created_at` timestamp NOT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `timezone` varchar(45) NOT NULL,
  `role` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (16,'Eri','$2b$10$FmEFQnsW9Nnd4lSK82/S0O3/Ox97n5e2mh/RTO0I8UDa28RRJfvqW','test1@endpoint.com','2023-05-25 11:34:35',NULL,'Europe/Paris','client'),(17,'Eri','$2b$10$FmEFQnsW9Nnd4lSK82/S0O3/Ox97n5e2mh/RTO0I8UDa28RRJfvqW','test1@endpoint.com','2023-05-25 11:34:47',NULL,'Europe/Paris','client'),(18,'Eri','$2b$10$qq2GDc8gRm3AZuCylghNgu1eLBZUpUf/wAjoFJKops8cNuW8lVkhq','test1@endpoint.com','2023-05-25 11:35:12',NULL,'Europe/Paris','client'),(19,'Eri2','$2b$10$dc9pmZ7YlXJcTGc6Bacel.133QfUOmNCgfkr2I5OQm9uEErvRB59u','test2@endpoint.com','2023-05-25 11:37:46',NULL,'Europe/Paris','client'),(20,'Eri3','$2b$10$Yly5.u.AgjAaUgOkNbyOeuH8FoxVeznvOtvsLe4hlTyPn.hyHFhCm','test3@endpoint.com','2023-05-25 11:38:21',NULL,'Europe/Paris','client'),(21,'Eri4','$2b$10$dPC7AI2C7xk7p.yjX.RtQePNtQgoMjLRDm6VGfDY9HUUMwR//Ao9W','test4@endpoint.com','2023-05-25 11:38:52',NULL,'Europe/Paris','client'),(22,'Eri5','$2b$10$grhymkzqe.yNzXYi70NfYu5dygxp12DPwuBp9MKxSYsMXRU.f80We','test5@endpoint.com','2023-05-25 11:39:02',NULL,'Europe/Paris','client'),(23,'Eri6','$2b$10$XQRjFeUD9/xYw/CTkYLvje4x1aTjSeK4AWZkY3IGdivWXh23gxT9u','test6@endpoint.com','2023-05-25 11:54:21',NULL,'Europe/Paris','client'),(24,'Jordan','$2b$10$zRE2nawKa0dwbhm55V4ESOIHR3zkX1NOo3muFETWMPpgA6Nmm0vMW','Jordan@endpoint.com','2023-05-30 07:51:20',NULL,'Europe/Paris','client');
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

-- Dump completed on 2023-05-30 13:17:56
