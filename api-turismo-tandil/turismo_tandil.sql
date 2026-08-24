-- --------------------------------------------------------
-- Base de Datos Oficial: turismo_tandil
-- Expediente Municipal N° 4115-2026-TUR
-- --------------------------------------------------------

CREATE DATABASE IF NOT EXISTS `turismo_tandil` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `turismo_tandil`;

-- --------------------------------------------------------
-- Tabla: `lugares` (Catálogo de Prestadores y Puntos de Interés)
-- --------------------------------------------------------

DROP TABLE IF EXISTS `lugares`;
CREATE TABLE IF NOT EXISTS `lugares` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(150) NOT NULL,
  `tipo` varchar(50) NOT NULL DEFAULT 'Paseo',
  `subtipo` varchar(100) DEFAULT '',
  `recomendado` tinyint(1) NOT NULL DEFAULT 0,
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
-- Datos Iniciales Oficiales: `lugares`
-- --------------------------------------------------------

INSERT INTO `lugares` (`id`, `nombre`, `tipo`, `subtipo`, `recomendado`, `descripcion`, `infoAmpliada`, `direccion`, `horarios`, `latitud`, `longitud`, `imagen`) VALUES
-- Gastronomía
(1, 'Época de Quesos', 'Gastronomía', 'Picadas y Quesos', 1, 'Tradicional almacén de campo y pulpería histórica, famoso por sus quesos y tablas de fiambres.', 'Emplazado en una casona histórica declarada patrimonio cultural. Ofrece degustación de los mejores salames tandileros con Denominación de Origen, quesos banquete, provoletas y conservas artesanales.', '14 de Julio 604 (esq. España)', '09:00 a 23:00 hs', -37.32750000, -59.13694000, 'https://images.unsplash.com/photo-1544025162-d76694265947'),
(2, 'Syquet Quesería & Regionales', 'Gastronomía', 'Picadas y Quesos', 1, 'Tienda gourmet y espacio de degustación de quesos tandileros, salames y delicias serranas.', 'Punto de referencia para adquirir tablas de quesos seleccionados, fiambres de producción local y dulces regionales elaborados bajo estrictas normas de calidad.', 'Mitre 599', '09:00 a 21:00 hs', -37.32620000, -59.13550000, 'https://images.unsplash.com/photo-1452195100486-9cc805987862'),
(3, 'Pulsar Cervecería Artesanal', 'Gastronomía', 'Cervecerías', 1, 'Cervecería de autor con canillas locales, hamburguesas gourmet y ambiente vibrante.', 'Cervecería artesanal de referencia en la noche tandilense. Variedad de estilos IPA, Honey, Stout y cervezas de estación acompañadas de gastronomía urbana de alta calidad.', 'Pinto 650', '19:00 a 03:00 hs', -37.32850000, -59.13780000, 'https://images.unsplash.com/photo-1535958636474-b021ee887b13'),
(4, 'Oakhill Cervecería', 'Gastronomía', 'Cervecerías', 0, 'Cerveza serrana, patio cervecero y gastronomía para compartir con amigos.', 'Espacioso deck al aire libre con música en vivo periódica, pizzas a la piedra y tablas de degustación de cervezas producidas con agua de las sierras.', 'Av. España 420', '19:30 a 02:30 hs', -37.32350000, -59.13320000, 'https://images.unsplash.com/photo-1571613316887-6f8d5cbf7ef7'),
(5, 'La Pulpería de Ramos', 'Gastronomía', 'Restaurantes', 1, 'Cocina criolla tradicional, pastas caseras y cortes de campo en un entorno autóctono.', 'Restaurante ambientado como una antigua posta rural. Especialidades en empanadas de carne cortada a cuchillo, pastas frescas y cordero al horno de barro.', 'Av. Estrada 1350', '12:00 a 16:00 y 20:30 a 00:30 hs', -37.34580000, -59.15520000, 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5'),
(6, 'Tierra de Azafranes', 'Gastronomía', 'Restaurantes', 1, 'Restaurante de autor especializado en risottos, paellas y pescados con toque serrano.', 'Galardonada propuesta gastronómica liderada por chefs tandileros. Destaca su carta de arroces del mundo y una exclusiva cava de vinos nacionales.', 'San Martín 1002', '20:30 a 00:30 hs', -37.33120000, -59.13900000, 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4'),
(7, 'Parrilla Al VerVerás', 'Gastronomía', 'Parrillas', 1, 'Asado criollo a las brasas, cortes seleccionados y achuras de primera calidad.', 'Emblemática parrilla tandilense con décadas de trayectoria. Ojo de bife, vacío al asador, provoleta tandilera y ensaladas de la huerta.', 'Av. Rivadavia 1120', '12:00 a 15:30 y 20:30 a 00:00 hs', -37.32180000, -59.14150000, 'https://images.unsplash.com/photo-1544025162-d76694265947'),
(8, 'Mostrador Café de Especialidad', 'Gastronomía', 'Cafeterías', 1, 'Café de origen, pastelería de autor y desayunos saludables en el centro.', 'Baristas certificados, granos seleccionados de Colombia y Etiopía, tostadas de masa madre, croissants rellenos y opciones sin TACC.', 'Rodríguez 542', '08:00 a 20:00 hs', -37.32650000, -59.13700000, 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb'),
-- Alojamiento
(9, 'Cabañas del Valle de los Ciervos', 'Alojamiento', 'Cabañas', 1, 'Complejo de cabañas de troncos y piedra en un predio natural de 15 hectáreas.', 'Ubicadas al pie de las sierras, cuentan con piscina climatizada cubierta, hidromasaje, desayuno serrano servido en la cabaña y actividades recreativas familiares.', 'Circuito Don Bosco s/n', 'Recepción 24 hs', -37.35800000, -59.12900000, 'https://images.unsplash.com/photo-1587061949409-02df41d5e562'),
(10, 'Hotel Amaike Golf & Spa', 'Alojamiento', 'Hoteles', 1, 'Exclusivo hotel 4 estrellas emplazado en el Tandil Golf Club con vista a las sierras.', 'Habitaciones de lujo, gastronomía internacional, piscina infinita climatizada, sauna seco y húmedo, y acceso directo a los campos de golf de 18 hoyos.', 'Ceferino Namuncurá s/n', 'Atención 24 hs', -37.36500000, -59.11200000, 'https://images.unsplash.com/photo-1566073771259-6a8506099945'),
(11, 'Hotel Libertador', 'Alojamiento', 'Hoteles', 0, 'Hotel céntrico de categoría con estacionamiento, salas de conferencias y confort.', 'Ubicación estratégica en el área bancaria y comercial de Tandil. Habitaciones modernas con aire acondicionado, desayuno buffet y atención corporativa.', 'Mitre 545', 'Atención 24 hs', -37.32550000, -59.13600000, 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa'),
(12, 'Posada de los Pájaros', 'Alojamiento', 'Posadas', 1, 'Posada serrana con encanto, piscina exterior y amplio parque arbolado.', 'Ambiente cálido y personalizado atendido por sus propios dueños. Decoración campestre de alta calidad, casa de té y vistas al atardecer serrano.', 'Av. Don Bosco 1450', 'Recepción 08:00 a 22:00 hs', -37.35300000, -59.12650000, 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4'),
-- Paseos y Atractivos
(13, 'Parque Lítico Piedra Movediza', 'Paseo', 'Parques', 1, 'Monumento geológico histórico con réplica de la mítica piedra que oscilaba.', 'Uno de los emblemas mundiales de Tandil. En la cima del cerro se halla la réplica de la famosa mole de granito de 300 toneladas que cayó en 1912.', 'Paraje La Movediza', '08:00 a 20:00 hs', -37.31139000, -59.16722000, 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b'),
(14, 'Cerro El Centinela', 'Paseo', 'Miradores', 1, 'Complejo recreativo serrano con aerosillas, miradores panorámicos y gastronomía.', 'Famosa piedra de granito de más de 7 metros de altura en posición vertical equilibrada. Ofrece aerosillas de montaña que cruzan pinares, paseos a caballo y artesanías locales.', 'Av. Estrada s/n', '09:00 a 20:00 hs', -37.35416000, -59.16833000, 'https://images.unsplash.com/photo-1506744038136-46273834b3fb'),
(15, 'Lago del Fuerte y Dique', 'Paseo', 'Espacios Recreativos', 1, 'Espejo de agua artificial con geiser central, senderos aeróbicos y balneario.', 'Epicentro de actividades al aire libre en Tandil. Cuenta con circuito aeróbico de 3.5 km, alquiler de kayaks y botes a pedal, plaza de juegos y ferias artesanales.', 'Av. Don Bosco y Zarini', 'Acceso libre 24hs', -37.34861000, -59.12917000, 'https://images.unsplash.com/photo-1501785888041-af3ef285b470'),
(16, 'Monte Calvario', 'Paseo', 'Sitios Religiosos', 1, 'Tercer Vía Crucis más trascendente del mundo, inmerso en un bosque de eucaliptos y pinos.', 'Inaugurado en 1943. Consta de 14 estaciones con magníficas esculturas de piedra y bronce que culminan en una imponente cruz de granito de 22 metros de altura.', 'Av. Monseñor de Andrea s/n', '08:00 a 19:00 hs', -37.32250000, -59.14889000, 'https://images.unsplash.com/photo-1548625149-fc4a29cf7092'),
-- Cultura
(17, 'Museo Histórico Fuerte Independencia', 'Cultura', 'Museos', 1, 'Uno de los museos tradicionalistas más importantes del país con más de 10.000 piezas históricas.', 'Resguarda carruajes originales del siglo XIX, uniformes militares, armas de época, pulpería reconstruida y testimonios de la inmigración europea.', '4 de Julio 455', '15:30 a 19:30 hs', -37.32940000, -59.13640000, 'https://images.unsplash.com/photo-1565034946487-077786996e27'),
(18, 'MUMBAT - Museo de Bellas Artes', 'Cultura', 'Museos', 1, 'Pinacoteca con colecciones maestras de pintura, escultura y grabado nacional y latinoamericano.', 'Fundado en 1937. Alberga obras invaluables de Quinquela Martín, Castagnino, Fader y artistas contemporáneos de renombre.', 'Chacabuco 357', '09:00 a 13:00 y 16:00 a 20:00 hs', -37.32700000, -59.13500000, 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3'),
-- Aventura
(19, 'Valle del Picapedrero (Turismo Activo)', 'Aventura', 'Circuitos de Escalada', 1, 'Parque de aventuras en antigua cantera de adoquines con tirolesas, vías de escalada y rappel.', 'Complejo de turismo aventura con vías escuela de escalada en roca de granito, circuito de puentes colgantes, tirolesa de 200 metros y trekking histórico.', 'Av. Don Bosco 2000', '10:00 a 18:30 hs', -37.36111000, -59.14167000, 'https://images.unsplash.com/photo-1522163182402-834f871fd851'),
(20, 'Sendero Sierra de las Ánimas', 'Aventura', 'Trekking', 1, 'Trekking de media montaña con ascensión a uno de los puntos más altos del sistema de Tandilia.', 'Ruta de senderismo de 8 km ida y vuelta entre pastizales serranos, formaciones líticas y vistas increíbles de 500 metros sobre el nivel del mar.', 'Ruta Provincial 74 km 210', '08:00 a 17:00 hs', -37.35200000, -59.16100000, 'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99');

-- --------------------------------------------------------
-- Tabla: `eventos` (Agenda Oficial de Eventos y Festividades)
-- --------------------------------------------------------

DROP TABLE IF EXISTS `eventos`;
CREATE TABLE IF NOT EXISTS `eventos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(150) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `fecha` date NOT NULL,
  `horario` varchar(100) DEFAULT '',
  `lugar` varchar(150) NOT NULL,
  `imagen` varchar(500) DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `eventos` (`id`, `nombre`, `descripcion`, `fecha`, `horario`, `lugar`, `imagen`) VALUES
(1, 'Fiesta del Queso Tandilero (Edición Anual)', 'Gran fiesta provincial con más de 30 empresas queseras de Tandil, degustaciones, clases magistrales de cocina y espectáculos en vivo.', '2026-09-12', '11:00 a 23:00 hs', 'Diagonal Illia - Parque Independencia', 'https://images.unsplash.com/photo-1544025162-d76694265947'),
(2, 'Festival de la Sierra y el Salame de Tandil', 'Tradicional festival folklórico y de doma, con la medición del Salame con Denominación de Origen más largo del mundo.', '2026-09-26', '19:00 a 02:00 hs', 'Anfiteatro Municipal Martín Fierro', 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819'),
(3, 'Noche de los Museos Serranos', 'Apertura nocturna especial de museos, centros culturales y galerías con visitas guiadas temáticas, intervenciones teatrales y música acústica.', '2026-10-10', '18:00 a 00:00 hs', 'Circuito de Museos Urbanos de Tandil', 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3');

-- --------------------------------------------------------
-- Tabla: `visitas` (Estadísticas y Métricas de Acceso)
-- --------------------------------------------------------

DROP TABLE IF EXISTS `visitas`;
CREATE TABLE IF NOT EXISTS `visitas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fecha` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
