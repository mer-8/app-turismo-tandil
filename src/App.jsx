import { useEffect, useState } from 'react';
import { lugaresTandil } from './data/tandilData';
import CityMap from './components/CityMap.jsx';
import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Filtros from './components/Filtros';
import CardLugar from './components/CardLugar';
import ModalDetalle from './components/ModalDetalle';

function App() {
    const [busqueda, setBusqueda] = useState("");
    const [installPrompt, setInstallPrompt] = useState(null);
    const [vistaActiva, setVistaActiva] = useState('inicio');
    const [categoria, setCategoria] = useState("");
    const [subCategoria, setSubCategoria] = useState("");
    const [lugarSeleccionado, setLugarSeleccionado] = useState(null);
    const [favoritos, setFavoritos] = useState(() => {
        const guardados = localStorage.getItem('tandil_favoritos');
        return guardados ? JSON.parse(guardados) : [];
    });

    // Estado para saber si estamos visualizando solo los favoritos
    const [verFavoritos, setVerFavoritos] = useState(false);

    // Guardar favoritos automáticamente en localStorage cuando cambien
    useEffect(() => {
        localStorage.setItem('tandil_favoritos', JSON.stringify(favoritos));
    }, [favoritos]);

    useEffect(() => {
        const handleBeforeInstallPrompt = (event) => {
            event.preventDefault();
            setInstallPrompt(event);
        };
        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    }, []);

    const instalarApp = async () => {
        if (!installPrompt) {
            alert('Si no aparece la instalación automática, podés agregar la app desde el menú del navegador.');
            return;
        }
        installPrompt.prompt();
        const resultado = await installPrompt.userChoice;
        if (resultado.outcome === 'accepted') {
            setInstallPrompt(null);
        }
    };

    // Función para alternar favorito
    const toggleFavorito = (idLugar) => {
        if (favoritos.includes(idLugar)) {
            setFavoritos(favoritos.filter(id => id !== idLugar));
        } else {
            setFavoritos([...favoritos, idLugar]);
        }
    };

    // Filtrado avanzado por texto, categoría principal, subtipo y sección de favoritos
    const lugaresFiltrados = lugaresTandil.filter(lugar => {
        const coincideBusqueda = lugar.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
                                 lugar.tipo.toLowerCase().includes(busqueda.toLowerCase());
        
        const coincideCategoria = categoria === "" || lugar.tipo.toLowerCase() === categoria.toLowerCase();
        const coincideSubCategoria = subCategoria === "" || (lugar.subtipo && lugar.subtipo.toLowerCase() === subCategoria.toLowerCase());
        const coincideFavorito = !verFavoritos || favoritos.includes(lugar.id);

        return coincideBusqueda && coincideCategoria && coincideSubCategoria && coincideFavorito;
    });

    return (
        <div style={{ background: '#efede6', minHeight: '100vh', paddingBottom: '40px' }}>

            {/* Navbar Componente */}
            <Navbar 
                vistaActiva={vistaActiva} 
                setVistaActiva={setVistaActiva} 
                verFavoritos={verFavoritos} 
                setVerFavoritos={setVerFavoritos} 
            />

            {/* Vista activa: Inicio vs Mapa */}
            {vistaActiva === 'inicio' ? (
                <>
                    {/* Hero Componente */}
                    <Hero busqueda={busqueda} setBusqueda={setBusqueda} />

                    {/* Filtros Componente */}
                    <Filtros 
                        categoria={categoria} 
                        setCategoria={setCategoria} 
                        subCategoria={subCategoria} 
                        setSubCategoria={setSubCategoria} 
                    />

                    {/* Contenido Principal (Tarjetas) */}
                    <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 20px' }}>
                        <h3 style={{ fontSize: '22px', color: '#1a3322', marginBottom: '20px' }}>
                            {verFavoritos ? 'Tus Lugares Favoritos' : 'Puntos Destacados'}
                        </h3>

                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                            gap: '25px',
                            marginBottom: '50px'
                        }}>
                            {lugaresFiltrados.length > 0 ? (
                                lugaresFiltrados.map((lugar) => (
                                    <CardLugar 
                                        key={lugar.id}
                                        lugar={lugar}
                                        onVerDetalle={(l) => setLugarSeleccionado(l)}
                                        esFavorito={favoritos.includes(lugar.id)}
                                        onToggleFavorito={toggleFavorito}
                                    />
                                ))
                            ) : (
                                <p style={{ gridColumn: '1 / -1', textAlign: 'center', color: '#888', fontSize: '16px' }}>
                                    {verFavoritos ? 'No tenés lugares guardados en favoritos todavía.' : 'No se encontraron lugares.'}
                                </p>
                            )}
                        </div>

                        {/* Botón Instalar PWA */}
                        <div style={{ textAlign: 'center' }}>
                            <button
                                onClick={instalarApp}
                                style={{
                                    maxWidth: '600px',
                                    padding: '16px 20px',
                                    border: 'none',
                                    borderRadius: '4px',
                                    background: '#5d7d65',
                                    color: '#ffffff',
                                    fontSize: '16px',
                                    fontWeight: 'bold',
                                    cursor: 'pointer',
                                    boxShadow: '0 4px 12px rgba(93, 125, 101, 0.3)',
                                    transition: 'background 0.3s'
                                }}
                            >
                                Instalar app en el celular
                            </button>
                        </div>
                    </main>
                </>
            ) : (
                /* Vista del Mapa */
                <div style={{ paddingTop: '100px' }}>
                    <CityMap />
                </div>
            )}

            {/* Modal de Detalle Componente */}
            <ModalDetalle 
                lugar={lugarSeleccionado} 
                onClose={() => setLugarSeleccionado(null)} 
            />
        </div>
    );
}

export default App;