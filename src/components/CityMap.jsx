import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
//import { lugaresTandil } from '../data/tandilData.js';

const crearIconoColor = (color) => {
    return new L.DivIcon({
        html: `<div style="background-color: ${color}; width: 16px; height: 16px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 6px rgba(0,0,0,0.4);"></div>`,
        className: 'custom-div-icon',
        iconSize: [20, 20],
        iconAnchor: [10, 10],
        popupAnchor: [0, -10]
    });
};

// Definición de colores por categoría
const iconosPorCategoria = {
    'Paseo': crearIconoColor('#2ecc71'),      
    'Gastronomía': crearIconoColor('#8e44ad'), 
    'Cultura': crearIconoColor('#f1c40f'),    
    'Aventura': crearIconoColor('#e67e22'),   
    'Default': crearIconoColor('#3498db')      
};

export default function CityMap({ lugares = [] }) {
    const cityCenter = [-37.32167, -59.13316]; // Coordenadas de Tandil

    return (
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '20px' }}>
            <h2 style={{ color: '#1a3322', marginBottom: '20px' }}>Mapa Turístico de Tandil</h2>

            <MapContainer
                center={cityCenter}
                zoom={13}
                style={{ height: "550px", width: "100%", borderRadius: "12px", boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {lugares.map(lugar => (
                    lugar.coords && (
                        <Marker
                            key={lugar.id}
                            position={lugar.coords}
                            // Selecciona el icono basado en el tipo del lugar
                            icon={iconosPorCategoria[lugar.tipo] || iconosPorCategoria['Default']}
                        >
                            <Popup>
                                <div style={{ textAlign: 'center' }}>
                                    <strong style={{ display: 'block', marginBottom: '5px' }}>{lugar.nombre}</strong>
                                    <span style={{ fontSize: '11px', color: '#555', background: '#f4f4f4', padding: '2px 6px', borderRadius: '4px' }}>
                                        {lugar.tipo}
                                    </span>
                                </div>
                            </Popup>
                        </Marker>
                    )
                ))}
            </MapContainer>
        </div>
    );
}