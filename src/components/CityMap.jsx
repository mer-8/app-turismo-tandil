import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { lugaresTandil } from '../data/tandilData.js';

// 1. Creas tu ícono personalizado con la imagen que quieras
const iconoPersonalizado = new L.Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png', // CAMBIAR EL PIN
    iconSize: [26, 26],
    iconAnchor: [18, 36],
    popupAnchor: [0, -36]
});

export default function CityMap() {
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

                {lugaresTandil.map(lugar => (
                    lugar.coords && (
                        <Marker
                            key={lugar.id}
                            position={lugar.coords}
                            icon={iconoPersonalizado} // 2. Se lo pasas a cada Marker
                        >
                            <Popup>
                                <strong>{lugar.nombre}</strong>
                                <p style={{ margin: '5px 0 0 0' }}>{lugar.descripcion}</p>
                            </Popup>
                        </Marker>
                    )
                ))}
            </MapContainer>
        </div>
    );
}