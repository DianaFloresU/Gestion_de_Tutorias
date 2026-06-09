-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 09, 2026 at 04:55 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `gestiontutorias`
--

-- --------------------------------------------------------

--
-- Table structure for table `estudiantes`
--

CREATE TABLE `estudiantes` (
  `id_estudiante` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `carrera` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `estudiantes`
--

INSERT INTO `estudiantes` (`id_estudiante`, `nombre`, `apellido`, `carrera`, `email`) VALUES
(1, 'Alejandro', 'Vargas', 'Informática', 'alejandro.v@univ.edu'),
(2, 'Sofía', 'Mendoza', 'Sistemas', 'sofia.m@univ.edu'),
(3, 'Carlos', 'Calderón', 'Informática', 'carlos.c@univ.edu'),
(4, 'Lucía', 'Fernández', 'Telecomunicaciones', 'lucia.f@univ.edu'),
(5, 'Mateo', 'Aparicio', 'Sistemas', 'mateo.a@univ.edu'),
(6, 'Valeria', 'Quispe', 'Informática', 'valeria.q@univ.edu'),
(7, 'Diego', 'Roca', 'Redes', 'diego.r@univ.edu'),
(8, 'Elena', 'Blanco', 'Telecomunicaciones', 'elena.b@univ.edu');

-- --------------------------------------------------------

--
-- Table structure for table `solicitudes`
--

CREATE TABLE `solicitudes` (
  `id_solicitud` int(11) NOT NULL,
  `id_estudiante` int(11) NOT NULL,
  `asignatura` varchar(50) NOT NULL,
  `descripcion_problema` text DEFAULT NULL,
  `fecha_solicitud` date NOT NULL,
  `estado` enum('Pendiente','Asignada','Rechazada') DEFAULT 'Pendiente'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `solicitudes`
--

INSERT INTO `solicitudes` (`id_solicitud`, `id_estudiante`, `asignatura`, `descripcion_problema`, `fecha_solicitud`, `estado`) VALUES
(1, 1, 'Base de Datos I', 'Problemas para entender normalización y álgebra relacional.', '2026-06-01', 'Asignada'),
(2, 2, 'Programación II', 'Apoyo con herencia y polimorfismo en Java.', '2026-06-02', 'Asignada'),
(3, 3, 'Cálculo I', 'Dificultades con límites e integrales definidas.', '2026-06-02', 'Asignada'),
(4, 4, 'Redes de Computadoras', 'Configuración de subredes e direccionamiento IP.', '2026-06-03', 'Asignada'),
(5, 5, 'Estructuras de Datos', 'Concepto de árboles binarios de búsqueda.', '2026-06-04', 'Asignada'),
(6, 6, 'Base de Datos I', 'No logro optimizar consultas con INNER JOIN complejos.', '2026-06-05', 'Asignada'),
(7, 7, 'Sistemas Operativos', 'Dudas sobre gestión de memoria y paginación.', '2026-06-06', 'Pendiente'),
(8, 8, 'Programación Web', 'Dudas con el manejo de estados asíncronos.', '2026-06-07', 'Rechazada');

-- --------------------------------------------------------

--
-- Table structure for table `tutores`
--

CREATE TABLE `tutores` (
  `id_tutor` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `especialidad` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tutores`
--

INSERT INTO `tutores` (`id_tutor`, `nombre`, `apellido`, `especialidad`, `email`) VALUES
(1, 'Andrés', 'Castro', 'Base de Datos', 'andres.c@tutor.univ.edu'),
(2, 'Beatriz', 'Luna', 'Programación Web', 'beatriz.l@tutor.univ.edu'),
(3, 'Christian', 'Soliz', 'Redes y Conectividad', 'christian.s@tutor.univ.edu'),
(4, 'Daniela', 'Prado', 'Estructuras de Datos', 'daniela.p@tutor.univ.edu'),
(5, 'Eduardo', 'Gómez', 'Cálculo y Álgebra', 'eduardo.g@tutor.univ.edu'),
(6, 'Fabiola', 'Rojas', 'Ingeniería de Software', 'fabiola.r@tutor.univ.edu'),
(7, 'Gustavo', 'Marín', 'Sistemas Operativos', 'gustavo.m@tutor.univ.edu'),
(8, 'Helena', 'Arce', 'Inteligencia Artificial', 'helena.a@tutor.univ.edu');

-- --------------------------------------------------------

--
-- Table structure for table `tutorias`
--

CREATE TABLE `tutorias` (
  `id_tutoria` int(11) NOT NULL,
  `id_solicitud` int(11) NOT NULL,
  `id_tutor` int(11) NOT NULL,
  `fecha_hora` datetime NOT NULL,
  `aula_o_link` varchar(100) NOT NULL,
  `estado_tutoria` enum('Programada','Realizada','Cancelada') DEFAULT 'Programada',
  `observaciones` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tutorias`
--

INSERT INTO `tutorias` (`id_tutoria`, `id_solicitud`, `id_tutor`, `fecha_hora`, `aula_o_link`, `estado_tutoria`, `observaciones`) VALUES
(1, 1, 1, '2026-06-03 14:30:00', 'Aula Virtual A', 'Realizada', 'Se explicaron las 3 primeras formas normales. El estudiante entendió bien.'),
(2, 2, 2, '2026-06-04 10:00:00', 'Laboratorio de Simulación 2', 'Realizada', 'Se hicieron ejercicios prácticos de interfaces y clases abstractas.'),
(3, 3, 5, '2026-06-04 16:00:00', 'Cubículo de Tutorías 3', 'Realizada', 'Repaso completo de teoremas de integración.'),
(4, 4, 3, '2026-06-05 11:00:00', 'Aula Virtual B', 'Realizada', 'Se resolvieron ejercicios de máscaras VLSM.'),
(5, 5, 4, '2026-06-08 09:00:00', 'Laboratorio de Cómputo 1', 'Realizada', 'Implementación de inserción en árboles AVL.'),
(6, 6, 1, '2026-06-10 15:00:00', 'Aula Virtual A', 'Programada', 'Pendiente por realizar esta semana.'),
(7, 1, 1, '2026-06-05 14:30:00', 'Aula Virtual A', 'Realizada', 'Segunda sesión de refuerzo solicitada por el tutor.'),
(8, 3, 5, '2026-06-06 16:00:00', 'Cubículo de Tutorías 3', 'Cancelada', 'El estudiante tuvo un cruce de horario con un examen.');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `estudiantes`
--
ALTER TABLE `estudiantes`
  ADD PRIMARY KEY (`id_estudiante`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `solicitudes`
--
ALTER TABLE `solicitudes`
  ADD PRIMARY KEY (`id_solicitud`),
  ADD KEY `id_estudiante` (`id_estudiante`);

--
-- Indexes for table `tutores`
--
ALTER TABLE `tutores`
  ADD PRIMARY KEY (`id_tutor`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `tutorias`
--
ALTER TABLE `tutorias`
  ADD PRIMARY KEY (`id_tutoria`),
  ADD KEY `id_solicitud` (`id_solicitud`),
  ADD KEY `id_tutor` (`id_tutor`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `estudiantes`
--
ALTER TABLE `estudiantes`
  MODIFY `id_estudiante` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `solicitudes`
--
ALTER TABLE `solicitudes`
  MODIFY `id_solicitud` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `tutores`
--
ALTER TABLE `tutores`
  MODIFY `id_tutor` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `tutorias`
--
ALTER TABLE `tutorias`
  MODIFY `id_tutoria` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `solicitudes`
--
ALTER TABLE `solicitudes`
  ADD CONSTRAINT `solicitudes_ibfk_1` FOREIGN KEY (`id_estudiante`) REFERENCES `estudiantes` (`id_estudiante`) ON DELETE CASCADE;

--
-- Constraints for table `tutorias`
--
ALTER TABLE `tutorias`
  ADD CONSTRAINT `tutorias_ibfk_1` FOREIGN KEY (`id_solicitud`) REFERENCES `solicitudes` (`id_solicitud`) ON DELETE CASCADE,
  ADD CONSTRAINT `tutorias_ibfk_2` FOREIGN KEY (`id_tutor`) REFERENCES `tutores` (`id_tutor`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
