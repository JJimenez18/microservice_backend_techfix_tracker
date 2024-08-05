-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: localhost    Database: techfix_tracker_db
-- ------------------------------------------------------
-- Server version	9.0.0

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
-- Table structure for table `usuarios_login`
--

DROP TABLE IF EXISTS `usuarios_login`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios_login` (
  `id_login` int NOT NULL AUTO_INCREMENT,
  `nombre_usuario` varchar(150) CHARACTER SET utf8mb3 NOT NULL,
  `contrasena_login` varchar(500) CHARACTER SET utf8mb3 NOT NULL,
  `tipo_usuario` int NOT NULL,
  `estatus` int NOT NULL,
  `email` varchar(150) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL,
  `fecha_registro` datetime NOT NULL,
  PRIMARY KEY (`id_login`),
  UNIQUE KEY `nombre_usuario` (`nombre_usuario`),
  KEY `fk_tipo_usuario` (`tipo_usuario`),
  CONSTRAINT `fk_tipo_usuario` FOREIGN KEY (`tipo_usuario`) REFERENCES `cat_tipo_usuarios` (`id_tipo`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios_login`
--

LOCK TABLES `usuarios_login` WRITE;
/*!40000 ALTER TABLE `usuarios_login` DISABLE KEYS */;
INSERT INTO `usuarios_login` VALUES (1,'jjimenez18','baf7a24264277ee6b471c1f20e3dbde0:fe8c7b2497ef4332b114fd2ca928d701d760f23c0f95780d92c6ec163c5d0179da96e4bba61a410817d8fa51890eeb66cde6e543f989656b2246f450149c4258',1,1,'eduardo.beone@hotmail.com','2024-07-28 11:40:04'),(2,'useradmin24','1234',1,1,'eduardo.beone@hotmail.com','2024-08-03 14:11:41'),(9,'jjimenez182','987468af01844d473bbfbb539d698bc6:c91fd9ce1a2c1c8c67c8716d90c20a010a7645209e5467b2256c77bc210aae73e01336d1f67772cce0c86808665c74dac6281479d76ffffe4913a64e55f35a97',3,1,'asajksa@hola.com','2024-08-03 23:24:41');
/*!40000 ALTER TABLE `usuarios_login` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-08-04 15:57:39
