import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { lugaresTandil } from '../data/tandilData';

import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

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

                {/* Recorremos tus datos para poner un marcador por cada lugar */}
                {lugaresTandil.map(lugar => (
                    // Asegúrate de que tus objetos en tandilData tengan una propiedad 'coords: [lat, lng]'
                    lugar.coords && (
                        <Marker key={lugar.id} position={lugar.coords}>
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