-- MySQL dump 10.13  Distrib 8.0.26, for macos10.14 (x86_64)
--
-- Host: localhost    Database: tech_blog_db
-- ------------------------------------------------------
-- Server version	8.0.26

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comment` (
  `id` int NOT NULL AUTO_INCREMENT,
  `content` text NOT NULL,
  `user_id` int NOT NULL,
  `post_id` int NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `post_id` (`post_id`),
  CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `comment_ibfk_2` FOREIGN KEY (`post_id`) REFERENCES `post` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
INSERT INTO `comment` VALUES (1,'I love using React, it\'s so cool the way it constantly updates based on your backend JS files!',2,1,'2021-10-30 23:04:32','2021-10-30 23:04:32'),(2,'Try using Browserify! Browserify allows you to create a front end JS file that has access to your node modules.',2,2,'2021-10-30 23:04:32','2021-10-30 23:04:32'),(3,'I agree Browserify is super easy to use and you can import what ever node modules you need.',4,2,'2021-10-30 23:04:32','2021-10-30 23:04:32'),(4,'Congratulations!',5,3,'2021-10-30 23:04:32','2021-10-30 23:04:32'),(5,'Congrats!!',3,3,'2021-10-30 23:04:32','2021-10-30 23:04:32'),(6,'HTTPS is basically an encrypted version of HTTP. HTTP stands for Hypertext Transfer Protocol. This protocol includes the CRUD methods of GET, POST, PUT, and DELETE (along with some others), and defines the way the request-response cycle works. Hope that helps!',1,4,'2021-10-30 23:04:32','2021-10-30 23:04:32'),(7,'I\'ve used Foundation before but their XY Grid was a bit difficult to wrap my head around. It seems like it\'s a powerful framework with a bit of a learning curve.',2,5,'2021-10-30 23:04:32','2021-10-30 23:04:32'),(9,'maybe?',1,1,'2021-10-30 23:08:05','2021-10-30 23:08:05');
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post`
--

DROP TABLE IF EXISTS `post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `post` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `user_id` int NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `post_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post`
--

LOCK TABLES `post` WRITE;
/*!40000 ALTER TABLE `post` DISABLE KEYS */;
INSERT INTO `post` VALUES (1,'Soon I\'ll know the entire MERN stack!','I\'m finally learning React which is the last technology I need to learn in the MERN stack! Did you know React uses the DOM to constantly update content behind the scenes? It\'s so much more efficient compared to using a front in JS file to manually dynamically create and update HTML. I almost wish I had known about it sooner, but React is complicated so I see why I needed to learn it last. I can\'t wait to make a bunch of React apps after this!',1,'2021-10-30 23:04:32','2021-10-30 23:04:32'),(2,'Node modules in the front end?','I tried requiring Node modules in my front end JS files but something isn\'t working right, is there a way I can use my handy 3rd party libraries in the front end?',3,'2021-10-30 23:04:32','2021-10-30 23:04:32'),(3,'Starting new position as junior web developer!','I recently graduated from the UCF coding bootcamp and I just accepted my first position in the field!',2,'2021-10-30 23:04:32','2021-10-30 23:04:32'),(4,'HTTP or HTTPS?','Does anyone know the difference between HTTP and HTTPS? What does HTTP actually mean? Thanks for the help!',5,'2021-10-30 23:04:32','2021-10-30 23:04:32'),(5,'Favorite CSS Frameworks','What are some of your favorite CSS frameworks? I\'ve used Bootstrap in the past and I like it for it\'s intuitive grid layout system and it\'s handy features such as it\'s built in card layouts.',4,'2021-10-30 23:04:32','2021-10-30 23:04:32');
/*!40000 ALTER TABLE `post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Sessions`
--

DROP TABLE IF EXISTS `Sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Sessions` (
  `sid` varchar(36) NOT NULL,
  `expires` datetime DEFAULT NULL,
  `data` text,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`sid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Sessions`
--

LOCK TABLES `Sessions` WRITE;
/*!40000 ALTER TABLE `Sessions` DISABLE KEYS */;
INSERT INTO `Sessions` VALUES ('3C_HLi0UyAA93zB40_bcFoshObGXj-8Y','2021-10-31 20:00:14','{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"user_id\":2,\"username\":\"aidan\",\"loggedIn\":true}','2021-10-27 22:11:11','2021-10-30 20:00:14'),('KH36QtIxamzDU5bsKE0rUCCOySeSytGe','2021-10-31 23:08:37','{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"user_id\":1,\"username\":\"aidan\",\"loggedIn\":true}','2021-10-30 23:07:28','2021-10-30 23:08:37'),('QOuvJFc72h-xoGsIflXXR1i2pwwbAyYs','2021-10-31 18:32:22','{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"}}','2021-10-30 18:32:19','2021-10-30 18:32:22');
/*!40000 ALTER TABLE `Sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'aidan','$2b$10$3cOPIb1FeXvZ0MVv.IUf0Ono0AZcTV/sOP9heGfwCEC3D6XMGcXke','2021-10-30 23:04:32','2021-10-30 23:04:32'),(2,'webwarrior','$2b$10$Xg.oJ6XuwjU8FwaPPxODD.pGcSNQsBB87MOneoc3liZGgORN2B2qK','2021-10-30 23:04:32','2021-10-30 23:04:32'),(3,'realslimshady','$2b$10$rmC30.XREoCrvxKPxML1RuCpqOqcFvM35PG1tFQobJZp2UxY/nJ1C','2021-10-30 23:04:32','2021-10-30 23:04:32'),(4,'merntastic','$2b$10$ixr582wMeVw8GslEO58Sfuq0k9O7grZF0LDSRxMPVnn.Jb3EUDQBy','2021-10-30 23:04:32','2021-10-30 23:04:32'),(5,'nodenugget','$2b$10$ohxIQBPfKZnUfwGxLjbPxuH3ZJspZSQHeUJRc5qAN9AAmHAKgZQGS','2021-10-30 23:04:32','2021-10-30 23:04:32');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-10-31 14:28:10
