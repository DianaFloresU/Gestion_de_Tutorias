-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 15-06-2026 a las 00:02:29
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `gestiontutorias`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `bitacora_sesiones`
--

CREATE TABLE `bitacora_sesiones` (
  `id_bitacora` int(11) NOT NULL,
  `id_tutoria` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `hora` time NOT NULL,
  `temas_abordados` text NOT NULL,
  `observaciones_rendimiento` text DEFAULT NULL,
  `tareas_asignadas` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `bitacora_sesiones`
--

INSERT INTO `bitacora_sesiones` (`id_bitacora`, `id_tutoria`, `fecha`, `hora`, `temas_abordados`, `observaciones_rendimiento`, `tareas_asignadas`) VALUES
(5, 1, '2026-06-10', '14:30:00', 'Revisión de consultas complejas, INNER JOIN, LEFT JOIN y subconsultas.', 'El estudiante comprende la lógica pero se confunde al estructurar subconsultas.', 'Resolver la guía de ejercicios prácticos.'),
(6, 2, '2026-06-11', '16:00:00', 'Estructuras de control repetitivas y manejo de arreglos.', 'Muestra buen avance, logró resolver los problemas planteados.', 'Implementar dos algoritmos de ordenamiento.');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `control_asistencia`
--

CREATE TABLE `control_asistencia` (
  `id_asistencia` int(11) NOT NULL,
  `id_tutoria` int(11) NOT NULL,
  `id_estudiante` int(11) NOT NULL,
  `asistio` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `control_asistencia`
--

INSERT INTO `control_asistencia` (`id_asistencia`, `id_tutoria`, `id_estudiante`, `asistio`) VALUES
(9, 1, 3, 'Asistió'),
(10, 2, 4, 'Asistió'),
(11, 1, 5, 'Falta'),
(12, 2, 3, 'Justificado');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estudiantes`
--

CREATE TABLE `estudiantes` (
  `id_estudiante` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `carrera` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `estudiantes`
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
-- Estructura de tabla para la tabla `solicitudes`
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
-- Volcado de datos para la tabla `solicitudes`
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
-- Estructura de tabla para la tabla `tutores`
--

CREATE TABLE `tutores` (
  `id_tutor` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `especialidad` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tutores`
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
-- Estructura de tabla para la tabla `tutorias`
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
-- Volcado de datos para la tabla `tutorias`
--

INSERT INTO `tutorias` (`id_tutoria`, `id_solicitud`, `id_tutor`, `fecha_hora`, `aula_o_link`, `estado_tutoria`, `observaciones`) VALUES
(1, 1, 1, '2026-06-03 14:30:00', 'Aula Virtual A', 'Realizada', 'Se explicaron las 3 primeras formas normales. El estudiante entendió bien.'),
(2, 2, 1, '2026-06-04 10:00:00', 'Laboratorio de Simulación 2', 'Realizada', 'Se hicieron ejercicios prácticos de interfaces y clases abstractas.'),
(3, 3, 5, '2026-06-04 16:00:00', 'Cubículo de Tutorías 3', 'Realizada', 'Repaso completo de teoremas de integración.'),
(4, 4, 3, '2026-06-05 11:00:00', 'Aula Virtual B', 'Realizada', 'Se resolvieron ejercicios de máscaras VLSM.'),
(5, 5, 4, '2026-06-08 09:00:00', 'Laboratorio de Cómputo 1', 'Realizada', 'Implementación de inserción en árboles AVL.'),
(6, 6, 1, '2026-06-10 15:00:00', 'Aula Virtual A', 'Programada', 'Pendiente por realizar esta semana.'),
(7, 1, 1, '2026-06-05 14:30:00', 'Aula Virtual A', 'Realizada', 'Segunda sesión de refuerzo solicitada por el tutor.'),
(8, 3, 5, '2026-06-06 16:00:00', 'Cubículo de Tutorías 3', 'Cancelada', 'El estudiante tuvo un cruce de horario con un examen.');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `bitacora_sesiones`
--
ALTER TABLE `bitacora_sesiones`
  ADD PRIMARY KEY (`id_bitacora`),
  ADD KEY `id_tutoria` (`id_tutoria`);

--
-- Indices de la tabla `control_asistencia`
--
ALTER TABLE `control_asistencia`
  ADD PRIMARY KEY (`id_asistencia`),
  ADD KEY `id_tutoria` (`id_tutoria`),
  ADD KEY `id_estudiante` (`id_estudiante`);

--
-- Indices de la tabla `estudiantes`
--
ALTER TABLE `estudiantes`
  ADD PRIMARY KEY (`id_estudiante`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indices de la tabla `solicitudes`
--
ALTER TABLE `solicitudes`
  ADD PRIMARY KEY (`id_solicitud`),
  ADD KEY `id_estudiante` (`id_estudiante`);

--
-- Indices de la tabla `tutores`
--
ALTER TABLE `tutores`
  ADD PRIMARY KEY (`id_tutor`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indices de la tabla `tutorias`
--
ALTER TABLE `tutorias`
  ADD PRIMARY KEY (`id_tutoria`),
  ADD KEY `id_solicitud` (`id_solicitud`),
  ADD KEY `id_tutor` (`id_tutor`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `bitacora_sesiones`
--
ALTER TABLE `bitacora_sesiones`
  MODIFY `id_bitacora` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `control_asistencia`
--
ALTER TABLE `control_asistencia`
  MODIFY `id_asistencia` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `estudiantes`
--
ALTER TABLE `estudiantes`
  MODIFY `id_estudiante` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `solicitudes`
--
ALTER TABLE `solicitudes`
  MODIFY `id_solicitud` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `tutores`
--
ALTER TABLE `tutores`
  MODIFY `id_tutor` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `tutorias`
--
ALTER TABLE `tutorias`
  MODIFY `id_tutoria` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `bitacora_sesiones`
--
ALTER TABLE `bitacora_sesiones`
  ADD CONSTRAINT `bitacora_sesiones_ibfk_1` FOREIGN KEY (`id_tutoria`) REFERENCES `tutorias` (`id_tutoria`) ON DELETE CASCADE;

--
-- Filtros para la tabla `control_asistencia`
--
ALTER TABLE `control_asistencia`
  ADD CONSTRAINT `control_asistencia_ibfk_1` FOREIGN KEY (`id_tutoria`) REFERENCES `tutorias` (`id_tutoria`) ON DELETE CASCADE,
  ADD CONSTRAINT `control_asistencia_ibfk_2` FOREIGN KEY (`id_estudiante`) REFERENCES `estudiantes` (`id_estudiante`) ON DELETE CASCADE;

--
-- Filtros para la tabla `solicitudes`
--
ALTER TABLE `solicitudes`
  ADD CONSTRAINT `solicitudes_ibfk_1` FOREIGN KEY (`id_estudiante`) REFERENCES `estudiantes` (`id_estudiante`) ON DELETE CASCADE;

--
-- Filtros para la tabla `tutorias`
--
ALTER TABLE `tutorias`
  ADD CONSTRAINT `tutorias_ibfk_1` FOREIGN KEY (`id_solicitud`) REFERENCES `solicitudes` (`id_solicitud`) ON DELETE CASCADE,
  ADD CONSTRAINT `tutorias_ibfk_2` FOREIGN KEY (`id_tutor`) REFERENCES `tutores` (`id_tutor`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
