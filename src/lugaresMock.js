// Catálogo Oficial de Lugares y Prestadores de Tandil
// Estructurado según la taxonomía oficial del Municipio de Tandil

export const lugaresMock = [
    // ==========================================
    // 1. GASTRONOMÍA
    // ==========================================
    {
        id: 1,
        nombre: "Época de Quesos",
        tipo: "Gastronomía",
        subtipo: "Picadas y Quesos",
        recomendado: true,
        descripcion: "Tradicional almacén de campo y pulpería histórica, famoso por sus quesos y tablas de fiambres.",
        infoAmpliada: "Emplazado en una casona histórica declarada patrimonio cultural. Ofrece degustación de los mejores salames tandileros con Denominación de Origen, quesos banquete, provoletas y conservas artesanales.",
        direccion: "14 de Julio 604 (esq. España)",
        horarios: "Lunes a Domingos de 09:00 a 23:00 hs",
        imagen: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80",
        coords: [-37.3275, -59.1369]
    },
    {
        id: 2,
        nombre: "Syquet Quesería & Regionales",
        tipo: "Gastronomía",
        subtipo: "Picadas y Quesos",
        recomendado: true,
        descripcion: "Tienda gourmet y espacio de degustación de quesos tandileros, salames y delicias serranas.",
        infoAmpliada: "Punto de referencia para adquirir tablas de quesos seleccionados, fiambres de producción local y dulces regionales elaborados bajo estrictas normas de calidad.",
        direccion: "Mitre 599",
        horarios: "Lunes a Sábados de 09:00 a 21:00 hs - Domingos de 10:00 a 14:00 hs",
        imagen: "https://images.unsplash.com/photo-1452195100486-9cc805987862?w=800&q=80",
        coords: [-37.3262, -59.1355]
    },
    {
        id: 3,
        nombre: "Pulsar Cervecería Artesanal",
        tipo: "Gastronomía",
        subtipo: "Cervecerías",
        recomendado: true,
        descripcion: "Cervecería de autor con canillas locales, hamburguesas gourmet y ambiente vibrante.",
        infoAmpliada: "Cervecería artesanal de referencia en la noche tandilense. Variedad de estilos IPA, Honey, Stout y cervezas de estación acompañadas de gastronomía urbana de alta calidad.",
        direccion: "Pinto 650",
        horarios: "Miércoles a Domingos de 19:00 a 03:00 hs",
        imagen: "https://images.unsplash.com/photo-1535958636474-b021ee887b13?w=800&q=80",
        coords: [-37.3285, -59.1378]
    },
    {
        id: 4,
        nombre: "Oakhill Cervecería",
        tipo: "Gastronomía",
        subtipo: "Cervecerías",
        recomendado: false,
        descripcion: "Cerveza serrana, patio cervecero y gastronomía para compartir con amigos.",
        infoAmpliada: "Espacioso deck al aire libre con música en vivo periódica, pizzas a la piedra y tablas de degustación de cervezas producidas con agua de las sierras.",
        direccion: "Av. España 420",
        horarios: "Martes a Domingos de 19:30 a 02:30 hs",
        imagen: "https://images.unsplash.com/photo-1571613316887-6f8d5cbf7ef7?w=800&q=80",
        coords: [-37.3235, -59.1332]
    },
    {
        id: 5,
        nombre: "La Pulpería de Ramos",
        tipo: "Gastronomía",
        subtipo: "Restaurantes",
        recomendado: true,
        descripcion: "Cocina criolla tradicional, pastas caseras y cortes de campo en un entorno autóctono.",
        infoAmpliada: "Restaurante ambientado como una antigua posta rural. Especialidades en empanadas de carne cortada a cuchillo, pastas frescas y cordero al horno de barro.",
        direccion: "Av. Estrada 1350",
        horarios: "Jueves a Domingos de 12:00 a 16:00 hs y de 20:30 a 00:30 hs",
        imagen: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80",
        coords: [-37.3458, -59.1552]
    },
    {
        id: 6,
        nombre: "Tierra de Azafranes",
        tipo: "Gastronomía",
        subtipo: "Restaurantes",
        recomendado: true,
        descripcion: "Restaurante de autor especializado en risottos, paellas y pescados con toque serrano.",
        infoAmpliada: "Galardonada propuesta gastronómica liderada por chefs tandileros. Destaca su carta de arroces del mundo y una exclusiva cava de vinos nacionales.",
        direccion: "San Martín 1002",
        horarios: "Martes a Sábados de 20:30 a 00:30 hs - Domingos al mediodía",
        imagen: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",
        coords: [-37.3312, -59.1390]
    },
    {
        id: 7,
        nombre: "Parrilla Al VerVerás",
        tipo: "Gastronomía",
        subtipo: "Parrillas",
        recomendado: true,
        descripcion: "Asado criollo a las brasas, cortes seleccionados y achuras de primera calidad.",
        infoAmpliada: "Emblemática parrilla tandilense con décadas de trayectoria. Ojo de bife, vacío al asador, provoleta tandilera y ensaladas de la huerta.",
        direccion: "Av. Rivadavia 1120",
        horarios: "Todos los días de 12:00 a 15:30 hs y de 20:30 a 00:00 hs",
        imagen: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80",
        coords: [-37.3218, -59.1415]
    },
    {
        id: 8,
        nombre: "Mostrador Café de Especialidad",
        tipo: "Gastronomía",
        subtipo: "Cafeterías",
        recomendado: true,
        descripcion: "Café de origen, pastelería de autor y desayunos saludables en el centro.",
        infoAmpliada: "Baristas certificados, granos seleccionados de Colombia y Etiopía, tostadas de masa madre, croissants rellenos y opciones sin TACC.",
        direccion: "Rodríguez 542",
        horarios: "Lunes a Sábados de 08:00 a 20:00 hs",
        imagen: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&q=80",
        coords: [-37.3265, -59.1370]
    },
    {
        id: 9,
        nombre: "Café de la Plaza",
        tipo: "Gastronomía",
        subtipo: "Cafeterías",
        recomendado: false,
        descripcion: "Clásico café frente a la Plaza Independencia con vista arbolada y repostería artesanal.",
        infoAmpliada: "Punto de encuentro por excelencia de vecinos y turistas. Cafetería clásica, medialunas calientes y meriendas completas frente a la plaza principal.",
        direccion: "Pinto 502 (esq. Belgrano)",
        horarios: "Lunes a Domingos de 07:30 a 22:00 hs",
        imagen: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=800&q=80",
        coords: [-37.3259, -59.1363]
    },

    // ==========================================
    // 2. ALOJAMIENTO
    // ==========================================
    {
        id: 10,
        nombre: "Cabañas del Valle de los Ciervos",
        tipo: "Alojamiento",
        subtipo: "Cabañas",
        recomendado: true,
        descripcion: "Complejo de cabañas de troncos y piedra en un predio natural de 15 hectáreas.",
        infoAmpliada: "Ubicadas al pie de las sierras, cuentan con piscina climatizada cubierta, hidromasaje, desayuno serrano servido en la cabaña y actividades recreativas familiares.",
        direccion: "Circuito Don Bosco s/n",
        horarios: "Recepción 24 hs",
        imagen: "https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=800&q=80",
        coords: [-37.3580, -59.1290]
    },
    {
        id: 11,
        nombre: "Altos de Tandil Cabañas & Spa",
        tipo: "Alojamiento",
        subtipo: "Cabañas",
        recomendado: false,
        descripcion: "Unidades boutique con vista panorámica a los valles y servicio de spa integral.",
        infoAmpliada: "Totalmente equipadas con deck individual, parrilla propia, cocina completa, WiFi de alta velocidad y circuito de masajes relajantes.",
        direccion: "Zona El Paraíso s/n",
        horarios: "Recepción de 08:00 a 22:00 hs",
        imagen: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=800&q=80",
        coords: [-37.3625, -59.1180]
    },
    {
        id: 12,
        nombre: "Hotel Amaike Golf & Spa",
        tipo: "Alojamiento",
        subtipo: "Hoteles",
        recomendado: true,
        descripcion: "Exclusivo hotel 4 estrellas emplazado en el Tandil Golf Club con vista a las sierras.",
        infoAmpliada: "Habitaciones de lujo, gastronomía internacional, piscina infinita climatizada, sauna seco y húmedo, y acceso directo a los campos de golf de 18 hoyos.",
        direccion: "Ceferino Namuncurá s/n - Villa del Lago",
        horarios: "Atención 24 hs",
        imagen: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
        coords: [-37.3650, -59.1120]
    },
    {
        id: 13,
        nombre: "Hotel Libertador",
        tipo: "Alojamiento",
        subtipo: "Hoteles",
        recomendado: false,
        descripcion: "Hotel céntrico de categoría con estacionamiento, salas de conferencias y confort.",
        infoAmpliada: "Ubicación estratégica en el área bancaria y comercial de Tandil. Habitaciones modernas con aire acondicionado, desayuno buffet y atención corporativa.",
        direccion: "Mitre 545",
        horarios: "Atención 24 hs",
        imagen: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80",
        coords: [-37.3255, -59.1360]
    },
    {
        id: 14,
        nombre: "Posada de los Pájaros",
        tipo: "Alojamiento",
        subtipo: "Posadas",
        recomendado: true,
        descripcion: "Posada serrana con encanto, piscina exterior y amplio parque arbolado.",
        infoAmpliada: "Ambiente cálido y personalizado atendido por sus propios dueños. Decoración campestre de alta calidad, casa de té y vistas al atardecer serrano.",
        direccion: "Av. Don Bosco 1450",
        horarios: "Check-in 14:00 hs - Check-out 11:00 hs",
        imagen: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80",
        coords: [-37.3530, -59.1265]
    },

    // ==========================================
    // 3. PASEOS Y ATRACTIVOS
    // ==========================================
    {
        id: 15,
        nombre: "Parque Lítico Piedra Movediza",
        tipo: "Paseo",
        subtipo: "Parques",
        recomendado: true,
        descripcion: "Monumento geológico histórico con réplica de la mítica piedra que oscilaba.",
        infoAmpliada: "Uno de los emblemas mundiales de Tandil. En la cima del cerro se halla la réplica de la famosa mole de granito de 300 toneladas que cayó en 1912. Cuenta con escaleras de granito y vistas panorámicas de la llanura y la ciudad.",
        direccion: "Paraje La Movediza (Acceso por calle Movediza)",
        horarios: "Abierto todos los días de 08:00 a 20:00 hs",
        imagen: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80",
        coords: [-37.3114, -59.1672]
    },
    {
        id: 16,
        nombre: "Cerro El Centinela",
        tipo: "Paseo",
        subtipo: "Miradores",
        recomendado: true,
        descripcion: "Complejo recreativo serrano con aerosillas, miradores panorámicos y gastronomía.",
        infoAmpliada: "Famosa piedra de granito de más de 7 metros de altura en posición vertical equilibrada. Ofrece aerosillas de montaña que cruzan pinares, paseos a caballo, restaurantes y artesanías locales.",
        direccion: "Av. Circuito Centinela s/n",
        horarios: "Lunes a Domingos de 09:00 a 19:30 hs",
        imagen: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80",
        coords: [-37.3541, -59.1683]
    },
    {
        id: 17,
        nombre: "Lago del Fuerte y Dique",
        tipo: "Paseo",
        subtipo: "Espacios Recreativos",
        recomendado: true,
        descripcion: "Espejo de agua artificial con geiser central, senderos aeróbicos y balneario.",
        infoAmpliada: "Epicentro de actividades al aire libre en Tandil. Cuenta con circuito aeróbico de 3.5 km, alquiler de kayaks y botes a pedal, plaza de juegos, ferias y su característico géiser con chorro de agua de más de 20 metros.",
        direccion: "Av. Zarini y López de Osornio",
        horarios: "Acceso libre 24 hs",
        imagen: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&q=80",
        coords: [-37.3486, -59.1291]
    },
    {
        id: 18,
        nombre: "Monte Calvario",
        tipo: "Paseo",
        subtipo: "Sitios Religiosos",
        recomendado: true,
        descripcion: "Tercer Vía Crucis más trascendente del mundo, inmerso en un bosque de eucaliptos y pinos.",
        infoAmpliada: "Inaugurado en 1943. Consta de 14 estaciones con magníficas esculturas de piedra y bronce en relieve que culminan en una imponente cruz de granito de 22 metros de altura y una reproducción de la Gruta de Lourdes.",
        direccion: "Av. Monseñor de Andrea y Pje. Padre Fitte",
        horarios: "Abierto todos los días de 08:00 a 19:00 hs",
        imagen: "https://images.unsplash.com/photo-1548625149-fc4a29cf7092?w=800&q=80",
        coords: [-37.3225, -59.1488]
    },
    {
        id: 19,
        nombre: "Parque Independencia & Castillo Morisco",
        tipo: "Paseo",
        subtipo: "Miradores",
        recomendado: true,
        descripcion: "Mirador central de 286 metros con acceso por portada de granito y castillo donado por la comunidad italiana.",
        infoAmpliada: "El mirador por excelencia del casco urbano. Posee una portada de estilo neoclásico de 1923, un Castillo de estilo morisco en la cumbre que funciona como confitería y vistas inigualables de toda la cuadrícula urbana.",
        direccion: "Av. España y Diagonal Illia",
        horarios: "Acceso libre peatonal 24 hs - Vehicular hasta las 22:00 hs",
        imagen: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&q=80",
        coords: [-37.3325, -59.1360]
    },
    {
        id: 20,
        nombre: "Parque del Origen",
        tipo: "Paseo",
        subtipo: "Espacios Recreativos",
        recomendado: false,
        descripcion: "Parque temático con réplicas gigantes de dinosaurios metálicos y juegos recreativos.",
        infoAmpliada: "Espacio verde familiar que bordea la presa del Ramal H. Posee esculturas de dinosaurios a escala real elaboradas por artistas locales, paseos peatonales, juegos inclusivos y áreas de descanso.",
        direccion: "Av. Larrea y Richieri",
        horarios: "Acceso libre 24 hs",
        imagen: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&q=80",
        coords: [-37.3510, -59.1210]
    },

    // ==========================================
    // 4. CULTURA
    // ==========================================
    {
        id: 21,
        nombre: "Museo Histórico Fuerte Independencia",
        tipo: "Cultura",
        subtipo: "Museos",
        recomendado: true,
        descripcion: "Uno de los museos tradicionalistas más importantes del país con más de 10.000 piezas históricas.",
        infoAmpliada: "Resguarda carruajes originales del siglo XIX, uniformes militares de la Campaña del Desierto, armas de época, pulpería reconstruida, sala de platería criolla y testimonios de la inmigración europea fundacional.",
        direccion: "4 de Julio 455",
        horarios: "Martes a Domingos de 15:30 a 19:30 hs",
        imagen: "https://images.unsplash.com/photo-1565034946487-077786996e27?w=800&q=80",
        coords: [-37.3294, -59.1364]
    },
    {
        id: 22,
        nombre: "MUMBAT - Museo de Bellas Artes de Tandil",
        tipo: "Cultura",
        subtipo: "Museos",
        recomendado: true,
        descripcion: "Pinacoteca con colecciones maestras de pintura, escultura y grabado nacional y latinoamericano.",
        infoAmpliada: "Fundado en 1937. Alberga obras invaluables de Quinquela Martín, Castagnino, Fader y artistas contemporáneos de renombre. Ofrece salas temporales, visitas guiadas y talleres educativos.",
        direccion: "Chacabuco 357",
        horarios: "Martes a Viernes de 09:00 a 13:00 y 16:00 a 20:00 hs - Sábados y Domingos de 16:00 a 20:00 hs",
        imagen: "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=800&q=80",
        coords: [-37.3270, -59.1350]
    },
    {
        id: 23,
        nombre: "Palacio Municipal e Iglesia Matriz",
        tipo: "Cultura",
        subtipo: "Edificios Históricos",
        recomendado: false,
        descripcion: "Conjunto monumental arquitectónico frente a la Plaza Independencia.",
        infoAmpliada: "El Palacio Municipal destaca por su torre de reloj y fachada neorrenacentista italiana. Junto a él, la Iglesia del Santísimo Sacramento (1878) preserva vitrales franceses y altares de mármol de Carrara.",
        direccion: "Belgrano 485",
        horarios: "Lunes a Viernes de 08:00 a 14:00 hs (Palacio) - Iglesia abierta todos los días",
        imagen: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=800&q=80",
        coords: [-37.3260, -59.1350]
    },
    {
        id: 24,
        nombre: "Teatro del Fuerte",
        tipo: "Cultura",
        subtipo: "Teatros",
        recomendado: false,
        descripcion: "Teatro municipal sala mayor para obras teatrales, orquestas sinfónicas y espectáculos de danza.",
        infoAmpliada: "Espacio con excelente acústica para 450 espectadores. Es sede habitual de festivales provinciales de teatro, conciertos de gala y comedias musicales.",
        direccion: "Fuerte Independencia 360",
        horarios: "Funciones según cartelera oficial",
        imagen: "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?w=800&q=80",
        coords: [-37.3280, -59.1345]
    },
    {
        id: 25,
        nombre: "Centro Cultural Universitario (CCU)",
        tipo: "Cultura",
        subtipo: "Centros Culturales",
        recomendado: false,
        descripcion: "Sede de extensión universitaria de la UNICEN con cine club, exposiciones y talleres.",
        infoAmpliada: "Auditorio, salas de artes visuales, ciclos de cine debate, conciertos de rock, jazz y folklore serrano con entrada libre y gratuita.",
        direccion: "Yrigoyen 662",
        horarios: "Lunes a Viernes de 09:00 a 21:00 hs - Fines de semana según actividades",
        imagen: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80",
        coords: [-37.3280, -59.1320]
    },

    // ==========================================
    // 5. AVENTURA
    // ==========================================
    {
        id: 26,
        nombre: "Valle del Picapedrero (Turismo Activo)",
        tipo: "Aventura",
        subtipo: "Circuitos de Escalada",
        recomendado: true,
        descripcion: "Parque de aventuras en antigua cantera de adoquines con tirolesas, vías de escalada y rappel.",
        infoAmpliada: "Complejo de turismo aventura con vías escuela de escalada en roca de granito, circuito de puentes colgantes, tirolesa de 200 metros y trekking interpretativo sobre la historia de los antiguos picapedreros tandilenses.",
        direccion: "Av. Don Bosco 2000 (Camino a las Sierras)",
        horarios: "Miércoles a Domingos de 10:00 a 18:30 hs",
        imagen: "https://images.unsplash.com/photo-1522163182402-834f871fd851?w=800&q=80",
        coords: [-37.3611, -59.1416]
    },
    {
        id: 27,
        nombre: "Sendero Sierra de las Ánimas",
        tipo: "Aventura",
        subtipo: "Trekking",
        recomendado: true,
        descripcion: "Trekking de media montaña con ascensión a uno de los puntos más altos del sistema de Tandilia.",
        infoAmpliada: "Ruta de senderismo de 8 km ida y vuelta entre pastizales serranos, formaciones líticas y vistas increíbles de 500 metros sobre el nivel del mar. Recomendado con guía o calzado de montaña.",
        direccion: "Ruta Provincial 74 km 210",
        horarios: "Todos los días de 08:00 a 17:00 hs (Registro obligatorio)",
        imagen: "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=800&q=80",
        coords: [-37.3520, -59.1610]
    },
    {
        id: 28,
        nombre: "Tandil Extremo (Canopy & Arborismo)",
        tipo: "Aventura",
        subtipo: "Turismo Activo",
        recomendado: true,
        descripcion: "Circuito aéreo en copa de árboles con puentes tibetanos y tirolesas para toda la familia.",
        infoAmpliada: "Parque aéreo certificado con arneses de línea de vida continua. Cuenta con circuitos de diferentes dificultades (Kids, Aventura y Extremo), rappel y muro de escalada.",
        direccion: "Paso de los Pioneros s/n",
        horarios: "Viernes, Sábados, Domingos y Feriados de 10:00 a 18:30 hs",
        imagen: "https://images.unsplash.com/photo-1533561365103-e1d53361df4b?w=800&q=80",
        coords: [-37.3390, -59.1450]
    },
    {
        id: 29,
        nombre: "Base del Cerro Leones & Cavernas",
        tipo: "Aventura",
        subtipo: "Exploración",
        recomendado: false,
        descripcion: "Exploración de túneles, cavas históricas de granito y senderos de geología serrana.",
        infoAmpliada: "Circuito guiado que desciende a antiguas canteras subterráneas donde se extraía la piedra para las calles de Buenos Aires. Una aventura fascinante con cascos y linternas.",
        direccion: "Paraje Cerro Leones (Acceso por Ruta 30)",
        horarios: "Sábados y Domingos con salidas a las 11:00, 14:00 y 16:30 hs",
        imagen: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&q=80",
        coords: [-37.2850, -59.0850]
    },
    {
        id: 30,
        nombre: "Cascada de la Sierra",
        tipo: "Aventura",
        subtipo: "Exploración",
        recomendado: false,
        descripcion: "Paseo de aventura y senderismo por arroyo serrano con caídas naturales de agua y ollas de piedra.",
        infoAmpliada: "Sendero de dificultad baja a media que recorre un arroyo de vertiente serrana que desciende entre peñascos. Ideal para fotografías en épocas de deshielo y lluvias.",
        direccion: "Zona La Cascada s/n (Continuación Don Bosco)",
        horarios: "Acceso con luz natural de 08:00 a 18:30 hs",
        imagen: "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=800&q=80",
        coords: [-37.3680, -59.1350]
    }
];
