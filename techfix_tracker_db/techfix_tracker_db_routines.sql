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
-- Dumping routines for database 'techfix_tracker_db'
--
/*!50003 DROP PROCEDURE IF EXISTS `SP_Alta_Direcciones` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_Alta_Direcciones`(
IN p_nombre_usuario VARCHAR(255),
IN p_calle VARCHAR(255),
IN p_numero_interior VARCHAR(255),
IN p_numero_exterior VARCHAR(255),
IN p_codigo_postal VARCHAR(255),
IN p_referencias VARCHAR(255)
)
BEGIN

DECLARE id_usuario INT DEFAULT 0;

-- Crear una tabla temporal para almacenar el mensaje y el estatus
    CREATE TEMPORARY TABLE IF NOT EXISTS temp_result (
        mensaje VARCHAR(255),
        estatus INT
    );
    
SELECT 
    u.id_usuario
INTO id_usuario FROM
    techfix_tracker_db.usuarios u
WHERE
    u.nombre_usuario COLLATE utf8mb3_spanish_ci = p_nombre_usuario;
    IF id_usuario >= 0 THEN
		START TRANSACTION;
        
		INSERT INTO direcciones (id_usuario, calle, numero_interior, numero_exterior, codigo_postal, referencias, estatus, fecha)
		VALUES (id_usuario, p_calle, p_numero_interior, p_numero_exterior, p_codigo_postal, p_referencias, 1, now());
        
        commit;

        -- Insertar el mensaje y el estatus en la tabla temporal
        INSERT INTO temp_result (mensaje, estatus)
        VALUES ('Registro exitoso', 1);
	ELSE
		-- Si el nombre de usuario ya existe, insertar mensaje de error en la tabla temporal
        INSERT INTO temp_result (mensaje, estatus)
        VALUES ('Error al realizar registro', 0);
    END IF;
    -- Seleccionar el resultado de la tabla temporal
SELECT 
    mensaje, estatus
FROM
    temp_result;

    -- Limpiar la tabla temporal
    DROP TEMPORARY TABLE IF EXISTS temp_result;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `SP_Alta_Usuario` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_Alta_Usuario`(
	IN p_nombre_usuario VARCHAR(50),
    IN p_contrasena_login VARCHAR(300),
    IN p_nombre VARCHAR(150),
    IN p_telefono VARCHAR(50),
    IN p_email VARCHAR(50)
)
BEGIN
    DECLARE usuario_existente INT DEFAULT 0;

    -- Crear una tabla temporal para almacenar el mensaje y el estatus
    CREATE TEMPORARY TABLE IF NOT EXISTS temp_result (
        mensaje VARCHAR(255),
        estatus INT
    );

    -- Validar si el nombre de usuario ya está registrado
SELECT 
    COUNT(*)
INTO usuario_existente FROM
    Usuarios_Login
WHERE
    nombre_usuario COLLATE utf8mb3_spanish_ci = p_nombre_usuario;

    -- Si el nombre de usuario no existe, registrar al usuario
    IF usuario_existente = 0 THEN
        START TRANSACTION;

        -- Insertar en Usuarios_Login
        INSERT INTO usuarios_login (nombre_usuario, contrasena_login, tipo_usuario, estatus, email, fecha_registro)
        VALUES (p_nombre_usuario, p_contrasena_login, 3, 1, p_email, now());

        -- Insertar en Usuarios
        INSERT INTO usuarios (nombre_usuario, nombre, telefono, fecha_registro)
        VALUES (p_nombre_usuario, p_nombre, p_telefono, now());

        COMMIT;

        -- Insertar el mensaje y el estatus en la tabla temporal
        INSERT INTO temp_result (mensaje, estatus)
        VALUES ('Usuario registrado exitosamente', 1);
    ELSE
        -- Si el nombre de usuario ya existe, insertar mensaje de error en la tabla temporal
        INSERT INTO temp_result (mensaje, estatus)
        VALUES ('El nombre de usuario ya está registrado', 0);
    END IF;

-- Seleccionar el resultado de la tabla temporal
SELECT 
    mensaje, estatus
FROM
    temp_result;

    -- Limpiar la tabla temporal
    DROP TEMPORARY TABLE IF EXISTS temp_result;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `SP_Borrado_Direcciones` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_Borrado_Direcciones`(
IN p_nombre_usuario VARCHAR(255),
IN p_order_id INT
)
BEGIN
DECLARE id_usuario INT DEFAULT -1;

-- Crear una tabla temporal para almacenar el mensaje y el estatus
    CREATE TEMPORARY TABLE IF NOT EXISTS temp_result (
        mensaje VARCHAR(255),
        estatus INT
    );
SELECT 
    u.id_usuario
INTO id_usuario 
FROM
    techfix_tracker_db.usuarios u
JOIN 
    techfix_tracker_db.direcciones d ON d.order_id = p_order_id
WHERE
    u.nombre_usuario COLLATE utf8mb3_spanish_ci = p_nombre_usuario
    AND
    d.estatus = 1;
    
    IF id_usuario >= 0 THEN
		START TRANSACTION;
        
		UPDATE techfix_tracker_db.direcciones SET estatus = 0 WHERE (order_id = p_order_id);

        commit;

        -- Insertar el mensaje y el estatus en la tabla temporal
        INSERT INTO temp_result (mensaje, estatus)
        VALUES ('Borrado exitoso', 1);
	ELSE
		-- Si el nombre de usuario ya existe, insertar mensaje de error en la tabla temporal
        INSERT INTO temp_result (mensaje, estatus)
        VALUES ('Error: El usuario proporcionado o direccion no encontrada', 0);
    END IF;
    -- Seleccionar el resultado de la tabla temporal
SELECT 
    mensaje, estatus
FROM
    temp_result;

    -- Limpiar la tabla temporal
    DROP TEMPORARY TABLE IF EXISTS temp_result;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `SP_Consulta_Direcciones` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_Consulta_Direcciones`(IN p_nombre_usuario VARCHAR(255))
BEGIN
SELECT 
	# u.id_usuario as id,
    # u.nombre_usuario as usuario,
    d.order_id as idDireccion,
    d.calle,
    d.numero_interior as numeroInterior,
    d.numero_exterior as numeroExterior,
    d.codigo_postal as codigoPostal,
    d.referencias
FROM 
    techfix_tracker_db.direcciones d
JOIN 
    techfix_tracker_db.usuarios u ON d.id_usuario = u.id_usuario
# JOIN 
#    techfix_tracker_db.usuarios_login ul ON u.nombre_usuario = ul.nombre_usuario
WHERE 
    # ul.nombre_usuario = p_nombre_usuario;
    u.nombre_usuario COLLATE utf8mb3_spanish_ci = p_nombre_usuario
    AND
    d.estatus = 1;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `SP_Consulta_Direccion_ID` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_Consulta_Direccion_ID`(
IN p_nombre_usuario VARCHAR(255),
IN p_order_id INT
)
BEGIN
SELECT 
	# u.id_usuario as id,
    # u.nombre_usuario as usuario,
    d.order_id as idDireccion,
    d.calle,
    d.numero_interior as numeroInterior,
    d.numero_exterior as numeroExterior,
    d.codigo_postal as codigoPostal,
    d.referencias
FROM 
    techfix_tracker_db.direcciones d
JOIN 
    techfix_tracker_db.usuarios u ON d.id_usuario = u.id_usuario
# JOIN 
#    techfix_tracker_db.usuarios_login ul ON u.nombre_usuario = ul.nombre_usuario
WHERE 
    u.nombre_usuario COLLATE utf8mb3_spanish_ci = p_nombre_usuario
    AND
    d.estatus = 1
    AND
    d.order_id = p_order_id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `SP_usuario_disponible` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_usuario_disponible`(IN p_nombre_usuario CHAR(50))
BEGIN
SELECT 
    COUNT(*) AS seEncontro
FROM 
    Usuarios_Login
WHERE 
    nombre_usuario COLLATE utf8mb3_spanish_ci =  p_nombre_usuario;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `SP_Valida_Login` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_Valida_Login`(IN p_nombre_usuario VARCHAR(255))
BEGIN
SELECT 
        ul.id_login as idLogin,
        ul.nombre_usuario as nombreUsuario,
        ul.contrasena_login as contrasenaLogin
    FROM 
        techfix_tracker_db.usuarios_login ul
    JOIN 
        techfix_tracker_db.usuarios u ON ul.nombre_usuario = u.nombre_usuario
    WHERE 
        ul.nombre_usuario COLLATE utf8mb3_spanish_ci = p_nombre_usuario
        AND ul.estatus = 1;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-08-04 15:57:41
