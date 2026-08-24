import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Función para calcular distancia euclídea/haversine en km
function calcularDistanciaKm(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radio de la Tierra en km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

// Iconos vectoriales personalizados por categoría oficial
const crearIconoColor = (color, emoji = '⟟') => {
    return new L.DivIcon({
        html: `
            <div style="
                background-color: ${color};
                width: 28px;
                height: 28px;
                border-radius: 50% 50% 50% 0;
                transform: rotate(-45deg);
                display: flex;
                align-items: center;
                justify-content: center;
                border: 2px solid #ffffff;
                box-shadow: 0 3px 8px rgba(0,0,0,0.35);
            ">
                <span style="transform: rotate(45deg); font-size: 13px; margin-top: -2px;">${emoji}</span>
            </div>
        `,
        className: 'custom-map-marker',
        iconSize: [28, 28],
        iconAnchor: [14, 28],
        popupAnchor: [0, -28]
    });
};

const iconoUsuario = new L.DivIcon({
    html: `
        <div style="
            background-color: #2563eb;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            border: 3px solid white;
            box-shadow: 0 0 0 6px rgba(37, 99, 235, 0.35);
        "></div>
    `,
    className: 'custom-user-marker',
    iconSize: [20, 20],
    iconAnchor: [10, 10],
    popupAnchor: [0, -10]
});

const iconosPorCategoria = {
    'Paseo': crearIconoColor('#2ecc71', '𖣂'),
    'Gastronomía': crearIconoColor('#9b59b6', '𐃯'),
    'Alojamiento': crearIconoColor('#e74c3c', '🏠︎'),
    'Cultura': crearIconoColor('#f39c12', '🏛'),
    'Aventura': crearIconoColor('#e67e22', 'ᨒ'),
    'Default': crearIconoColor('#3498db', '⟟')
};

// Componente auxiliar para recentrar mapa
function MapRecenter({ coords }) {
    const map = useMap();
    useEffect(() => {
        if (coords) {
            map.flyTo(coords, 14, { duration: 1.2 });
        }
    }, [coords, map]);
    return null;
}

export default function CityMap({ lugares = [], onVerDetalle }) {
    const cityCenter = [-37.32167, -59.13316]; // Centro histórico de Tandil
    const [filtroCategoria, setFiltroCategoria] = useState('');
    const [ubicacionUsuario, setUbicacionUsuario] = useState(null);
    const [centroMapa, setCentroMapa] = useState(cityCenter);
    const [cargandoGPS, setCargandoGPS] = useState(false);
    const [ordenarPorDistancia, setOrdenarPorDistancia] = useState(false);

    // Obtener geolocalización del usuario
    const obtenerUbicacion = () => {
        if (!navigator.geolocation) {
            alert('La geolocalización no está soportada por tu navegador.');
            return;
        }

        setCargandoGPS(true);
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                const userCoords = [pos.coords.latitude, pos.coords.longitude];
                setUbicacionUsuario(userCoords);
                setCentroMapa(userCoords);
                setOrdenarPorDistancia(true);
                setCargandoGPS(false);
            },
            (error) => {
                console.warn('Error al obtener GPS:', error.message);
                // Si el usuario deniega o falla, podemos simular una ubicación de prueba en Tandil
                alert('No se pudo acceder a tu GPS. Podés explorar los lugares directamente en el mapa.');
                setCargandoGPS(false);
            },
            { enableHighAccuracy: true, timeout: 10000 }
        );
    };

    // Filtrar y calcular distancias
    const lugaresConDistancia = lugares.map(l => {
        let dist = null;
        if (ubicacionUsuario && l.coords && l.coords.length === 2) {
            dist = calcularDistanciaKm(
                ubicacionUsuario[0],
                ubicacionUsuario[1],
                l.coords[0],
                l.coords[1]
            );
        }
        return { ...l, distanciaKm: dist };
    });

    const lugaresFiltrados = lugaresConDistancia
        .filter(l => !filtroCategoria || l.tipo.toLowerCase() === filtroCategoria.toLowerCase())
        .sort((a, b) => {
            if (ordenarPorDistancia && a.distanciaKm !== null && b.distanciaKm !== null) {
                return a.distanciaKm - b.distanciaKm;
            }
            return 0;
        });

    return (
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 15px 40px 15px' }}>
            {/* Cabecera del Mapa con Controles */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '15px',
                marginBottom: '20px'
            }}>
                <div>
                    <h2 style={{ color: '#1a3322', margin: '0 0 5px 0', fontSize: '24px', fontWeight: '800' }}>
                         Mapa Turístico Oficial de Tandil
                    </h2>
                    <p style={{ color: '#666', fontSize: '14px', margin: 0 }}>
                        Explorá los puntos georreferenciados y prestadores habilitados en el partido.
                    </p>
                </div>

                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    <button
                        onClick={obtenerUbicacion}
                        disabled={cargandoGPS}
                        style={{
                            background: ubicacionUsuario ? '#2563eb' : '#5d7d65',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '8px',
                            padding: '10px 16px',
                            fontWeight: '700',
                            fontSize: '13px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
                        }}
                    >
                        <span>{cargandoGPS ? 'Localizando...' : ubicacionUsuario ? 'Ubicación activa' : 'Mi Ubicación GPS'}</span>
                    </button>
                </div>
            </div>

            {/* Selector de categorías para el mapa */}
            <div style={{
                display: 'flex',
                gap: '8px',
                flexWrap: 'wrap',
                marginBottom: '15px'
            }}>
                {[
                    { label: 'Todos', val: '', color: '#333' },
                    { label: ' Paseos', val: 'Paseo', color: '#2ecc71' },
                    { label: ' Gastronomía', val: 'Gastronomía', color: '#9b59b6' },
                    { label: ' Alojamiento', val: 'Alojamiento', color: '#e74c3c' },
                    { label: ' Cultura', val: 'Cultura', color: '#f39c12' },
                    { label: ' Aventura', val: 'Aventura', color: '#e67e22' }
                ].map((item) => {
                    const activa = filtroCategoria === item.val;
                    return (
                        <button
                            key={item.val}
                            onClick={() => setFiltroCategoria(item.val)}
                            style={{
                                border: activa ? `2px solid ${item.color}` : '1px solid #d4d0c5',
                                background: activa ? '#ffffff' : '#f4f3ec',
                                color: '#1a3322',
                                padding: '6px 12px',
                                borderRadius: '20px',
                                fontSize: '12px',
                                fontWeight: activa ? '800' : '600',
                                cursor: 'pointer',
                                transition: 'all 0.15s'
                            }}
                        >
                            {item.label}
                        </button>
                    );
                })}
            </div>

            {/* Contenedor del Mapa Leaflet */}
            <div style={{
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 6px 20px rgba(0,0,0,0.12)',
                border: '1px solid #dcd8cd'
            }}>
                <MapContainer
                    center={cityCenter}
                    zoom={13}
                    style={{ height: "550px", width: "100%" }}
                >
                    <MapRecenter coords={centroMapa} />
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    {/* Marcador de la posición del usuario */}
                    {ubicacionUsuario && (
                        <Marker position={ubicacionUsuario} icon={iconoUsuario}>
                            <Popup>
                                <div style={{ textAlign: 'center', fontWeight: 'bold', color: '#2563eb' }}>
                                    Tu ubicación actual
                                </div>
                            </Popup>
                        </Marker>
                    )}

                    {/* Marcadores de los atractivos */}
                    {lugaresFiltrados.map((lugar) => {
                        if (!lugar.coords || lugar.coords.length !== 2) return null;
                        const icon = iconosPorCategoria[lugar.tipo] || iconosPorCategoria['Default'];

                        return (
                            <Marker
                                key={lugar.id}
                                position={lugar.coords}
                                icon={icon}
                            >
                                <Popup>
                                    <div style={{ minWidth: '180px', maxWidth: '240px', padding: '4px' }}>
                                        {lugar.imagen && (
                                            <img
                                                src={lugar.imagen}
                                                alt={lugar.nombre}
                                                style={{ width: '100%', height: '90px', objectFit: 'cover', borderRadius: '6px', marginBottom: '8px' }}
                                            />
                                        )}
                                        <h4 style={{ margin: '0 0 4px 0', fontSize: '15px', color: '#1a3322' }}>
                                            {lugar.nombre}
                                        </h4>
                                        <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', marginBottom: '6px' }}>
                                            <span style={{ fontSize: '10px', fontWeight: '700', background: '#e6efe9', color: '#36533f', padding: '2px 6px', borderRadius: '4px' }}>
                                                {lugar.tipo}
                                            </span>
                                            {lugar.recomendado && (
                                                <span style={{ fontSize: '10px', fontWeight: '700', background: '#fdf8ec', color: '#855d14', padding: '2px 6px', borderRadius: '4px' }}>
                                                     Recomendado
                                                </span>
                                            )}
                                        </div>

                                        {lugar.distanciaKm !== null && (
                                            <p style={{ margin: '0 0 8px 0', fontSize: '11px', color: '#2563eb', fontWeight: 'bold' }}>
                                                 A {lugar.distanciaKm < 1 ? `${Math.round(lugar.distanciaKm * 1000)} m` : `${lugar.distanciaKm.toFixed(1)} km`} de vos
                                            </p>
                                        )}

                                        <p style={{ margin: '0 0 8px 0', fontSize: '12px', color: '#555', lineHeight: '1.3' }}>
                                            {lugar.descripcion ? (lugar.descripcion.length > 70 ? lugar.descripcion.substring(0, 70) + '...' : lugar.descripcion) : ''}
                                        </p>

                                        {onVerDetalle && (
                                            <button
                                                onClick={() => onVerDetalle(lugar)}
                                                style={{
                                                    width: '100%',
                                                    background: '#5d7d65',
                                                    color: '#fff',
                                                    border: 'none',
                                                    borderRadius: '4px',
                                                    padding: '6px 10px',
                                                    fontSize: '12px',
                                                    fontWeight: '700',
                                                    cursor: 'pointer'
                                                }}
                                            >
                                                Ver información completa
                                            </button>
                                        )}
                                    </div>
                                </Popup>
                            </Marker>
                        );
                    })}
                </MapContainer>
            </div>
        </div>
    );
}
