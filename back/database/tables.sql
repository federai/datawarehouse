--ORDEN PARA CREAR LAS TABLES:
--1) usuarios
--2) regiones
--3) paises
--4) ciudades
--5) companias
--6) canales
--7) contactos
--8) contacto_canales

----------------------------USUARIOS-------------------------------
CREATE TABLE IF NOT EXISTS `usuarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `contrasenia` varchar(100) NOT NULL,
  `admin` varchar(5) NOT NULL,
  PRIMARY KEY (`id`)
);

---------------------------REGIONES-------------------------------
CREATE TABLE IF NOT EXISTS `regiones` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(60) NOT NULL,
  PRIMARY KEY (`id`)
);

---------------------------PAISES-------------------------------
CREATE TABLE IF NOT EXISTS `paises` (
  `id` int NOT NULL AUTO_INCREMENT,
  `region_id` int NOT NULL,
  `nombre` varchar(60) NOT NULL,
  PRIMARY KEY (`id`),
  foreign key (region_id) references regiones (id)
  ON DELETE CASCADE
);

---------------------------CIUDADES-------------------------------
CREATE TABLE IF NOT EXISTS `ciudades` (
  `id` int NOT NULL AUTO_INCREMENT,
  `pais_id` int NOT NULL,
  `nombre` varchar(60) NOT NULL,
  PRIMARY KEY (`id`),
  foreign key (pais_id) references paises (id)
  ON DELETE CASCADE
);

----------------------------COMPANIES-----------------------------------
CREATE TABLE IF NOT EXISTS `companias` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(60) NOT NULL,
  `email` varchar(100) NOT NULL,
  `telefono` varchar(20) NOT NULL,
  `direccion` varchar(400) NOT NULL,
  `ciudad_id` int NOT NULL,
  PRIMARY KEY (`id`),
  foreign key (ciudad_id) references ciudades (id)
);

---------------------------CANALES-------------------------------
CREATE TABLE IF NOT EXISTS `CANALES` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(60) NOT NULL,
  PRIMARY KEY (`id`)
);

----------------------------CONTACTOS-----------------------------------
CREATE TABLE IF NOT EXISTS `contactos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(60) NOT NULL,
  `apellido` varchar(60) NOT NULL,
  `email` varchar(100) NOT NULL,
  `cargo` varchar(60) NOT NULL,
  `interes` int NOT NULL,
  `direccion` varchar(400) NOT NULL,
  `ciudad_id` int NOT NULL,
  `compania_id` int NOT NULL,
  PRIMARY KEY (`id`),
    foreign key (ciudad_id) references ciudades (id)
  ON DELETE CASCADE,
  foreign key (compania_id) references companias (id)
  ON DELETE CASCADE
);


----------------------------CONTACTO_CANALES-----------------------------------
CREATE TABLE IF NOT EXISTS `contacto_canales` (
  `id` int NOT NULL AUTO_INCREMENT,
  `usuario` varchar(30) NOT NULL,
  `preferencias` varchar(50) NOT NULL,
  `contacto_id` int NOT NULL,
  `canal_id` int NOT NULL,
  PRIMARY KEY (`id`),
    foreign key (contacto_id) references contactos (id)
  ON DELETE CASCADE,
  foreign key (canal_id) references canales (id)
  ON DELETE CASCADE
);



