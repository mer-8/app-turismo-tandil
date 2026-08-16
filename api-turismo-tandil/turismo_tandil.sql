-- --------------------------------------------------------
-- Base de Datos: turismo_tandil
-- Script para inicialización de tablas y datos
-- --------------------------------------------------------

CREATE DATABASE IF NOT EXISTS `turismo_tandil` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `turismo_tandil`;

-- --------------------------------------------------------
-- Estructura de tabla para la tabla `lugares`
-- --------------------------------------------------------

DROP TABLE IF EXISTS `lugares`;
CREATE TABLE IF NOT EXISTS `lugares` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(150) NOT NULL,
  `tipo` varchar(50) NOT NULL DEFAULT 'Paseo',
  `subtipo` varchar(100) DEFAULT '',
  `descripcion` text DEFAULT NULL,
  `infoAmpliada` text DEFAULT NULL,
  `direccion` varchar(200) NOT NULL,
  `horarios` varchar(100) DEFAULT '',
  `latitud` decimal(10,8) DEFAULT NULL,
  `longitud` decimal(11,8) DEFAULT NULL,
  `imagen` varchar(500) DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------
-- Carga de datos iniciales para la tabla `lugares`
-- --------------------------------------------------------

INSERT INTO `lugares` (`id`, `nombre`, `tipo`, `subtipo`, `descripcion`, `infoAmpliada`, `direccion`, `horarios`, `latitud`, `longitud`, `imagen`) VALUES
(1, 'Cerro El Centinela', 'Paseo', 'Reserva Natural', 'Famosa formación rocosa sostenida en una posición increíble.', 'Un clásico de Tandil. Además de la icónica piedra en equilibrio, cuenta con aerosillas, gastronomía regional, senderos para caminatas y juegos de aventura.', 'Av. Estrada s/n', '09:00 a 20:00 hs', -37.35416000, -59.16833000, 'https://images.unsplash.com/photo-1506744038136-46273834b3fb'),
(2, 'Monte Calvario', 'Cultura', 'Religioso', 'Uno de los Vía Crucis más importantes del mundo.', 'Inaugurado en 1943, es el tercer Vía Crucis más importante a nivel mundial. Cuenta con una impresionante gruta y una enorme cruz en la cumbre del cerro.', 'Av. Monseñor de Andrea s/n', '08:00 a 19:00 hs', -37.32250000, -59.14889000, 'https://images.unsplash.com/photo-1548625149-fc4a29cf7092'),
(3, 'Lago del Fuerte', 'Paseo', 'Paseo Marítimo / Recreativo', 'El espejo de agua icónico del centro serrano con su famoso géiser.', 'Ideal para caminatas, running, ciclismo y deportes náuticos sin motor. En el centro se encuentra el icónico géiser (surtidor de agua) y en los alrededores hay una gran oferta gastronómica.', 'Av. Don Bosco y Zarini', 'Acceso libre 24hs', -37.34861000, -59.12917000, 'https://images.unsplash.com/photo-1501785888041-af3ef285b470'),
(4, 'Piedra Movediza', 'Paseo', 'Parque Histórico', 'Parque temático en el sitio de la legendaria piedra colapsada en 1912.', 'Lugar histórico donde se encontraba la mítica Piedra Movediza. Actualmente cuenta con un parque con escalinatas y una réplica en la cima instalada en 2007.', 'Calle Movediza y La Pastora', '08:00 a 20:00 hs', -37.31139000, -59.16722000, 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b'),
(5, 'Época de Quesos', 'Gastronomía', 'Picadas y Almacén', 'Tradicional almacén de ramos generales famoso por sus picadas.', 'Ubicado en una esquina histórica declarada monumento provincial. Especialistas en quesos de Tandil, salames con denominación de origen y picadas artesanales.', '14 de Julio 604', '10:00 a 23:00 hs', -37.32750000, -59.13694000, 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5'),
(6, 'Valle del Picapedrero', 'Aventura', 'Turismo Activo', 'Parque de aventuras con tirolesa, rappel y escalada en antigua cantera.', 'Ubicado en una antigua cantera recuperada. Ofrece actividades de escalada, rappel, tirolesas y puentes tibetanos rodeados de naturaleza.', 'Av. Don Bosco 2000', '10:00 a 18:30 hs', -37.36111000, -59.14167000, 'https://images.unsplash.com/photo-1522163182402-834f871fd851');

-- --------------------------------------------------------
-- Estructura de tabla para la tabla `visitas`
-- --------------------------------------------------------

DROP TABLE IF EXISTS `visitas`;
CREATE TABLE IF NOT EXISTS `visitas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fecha` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;