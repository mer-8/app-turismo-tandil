# Aplicación Oficial de Turismo y Servicios de Tandil 

> **Expediente Municipal N° 4115-2026-TUR**  
> **Dirección de Turismo • Municipio de Tandil**

Plataforma digital institucional desarrollada para centralizar la oferta turística, cultural, gastronómica y de servicios del partido de Tandil. El sistema conecta al Estado municipal con los prestadores locales y los visitantes, optimizando la experiencia turística mediante geolocalización en tiempo real, inteligencia artificial para armado de itinerarios y eliminación de folletería en papel.

---

##  Stack Tecnológico

- **Frontend / UI:** React 19 + Vite (Diseño Responsive PWA).
- **Geolocalización & Cartografía:** Leaflet & React-Leaflet con filtros de proximidad por GPS.
- **Asistente Inteligente (IA):** Orientador conversacional y generador automático de itinerarios personalizados según días de estadía y perfil del turista.
- **Persistencia de Datos:** LocalStorage para gestión de favoritos e itinerarios sin registro previo + API REST PHP con base de datos relacional MySQL (`turismo_tandil.sql`).
- **PWA & Distribución:** Soporte Offline con Service Worker, manifiesto web y empaquetado para Google Play Store.

---

##  Taxonomía Oficial de Categorías y Subcategorías

1. **Gastronomía:** Cervecerías, Picadas y Quesos, Restaurantes, Cafeterías, Parrillas. (*Filtro especial: Sello de "Nuestros Recomendados"*).
2. **Alojamiento:** Cabañas, Hoteles, Posadas. (*Filtro especial: Sello de "Nuestros Recomendados"*).
3. **Paseos y Atractivos:** Parques, Sitios Religiosos, Espacios Recreativos, Miradores panorámicos.
4. **Cultura:** Museos, Edificios Históricos, Teatros, Centros Culturales.
5. **Aventura:** Trekking, Circuitos de Escalada, Exploración, Turismo Activo en sierras.

---

##  Panel de Administración Municipal Secreto

- **Acceso:** Doble clic en el pie de página institucional (Footer) sobre el texto de derechos reservados.
- **Clave Institucional:** `admin123`
- **Funcionalidades:** Alta, baja y edición de prestadores con vista previa en tiempo real, publicación de eventos y métricas de inteligencia de datos.

---

##  Instrucciones de Ejecución

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Compilar para producción (PWA)
npm run build
```
