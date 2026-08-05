import { useEffect, useState } from 'react';
import { lugaresTandil } from './data/tandilData';
import CityMap from './map/CityMap.jsx'; // <--- 1. IMPORTAR EL MAPA
import './App.css';
import fondoTandil from './assets/fondoTandil.JPG';

function App() {
    const [busqueda, setBusqueda] = useState("");
    const [installPrompt, setInstallPrompt] = useState(null);
    const [vistaActiva, setVistaActiva] = useState('inicio'); // <--- 2. ESTADO PARA CAMBIAR ENTRE VISTAS

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

    const lugaresFiltrados = lugaresTandil.filter(lugar =>
        lugar.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
        lugar.tipo.toLowerCase().includes(busqueda.toLowerCase())
    );

    return (
        <div style={{ background: '#efede6', minHeight: '100vh', paddingBottom: '40px' }}>

            {/* 1. HEADER */}
            <header style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '20px 40px',
                position: 'fixed', // Cambiado a fixed para que el menú siempre esté visible
                top: 0,
                left: 0,
                right: 0,
                zIndex: 100,
                background: '#efede6',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
            }}>
                <h2
                    onClick={() => setVistaActiva('inicio')}
                    style={{
                        margin: 0,
                        fontSize: '22px',
                        fontWeight: '800',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        color: '#1a3322',
                        letterSpacing: '-0.5px',
                        cursor: 'pointer'
                    }}
                >
                    <span style={{
                        background: '#5d7d65',
                        color: '#fff',
                        padding: '6px',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 2px 5px rgba(93, 125, 101, 0.4)'
                    }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                            <circle cx="12" cy="10" r="3"></circle>
                        </svg>
                    </span>
                    <span>Tandil <span style={{ fontWeight: '400', color: '#5d7d65' }}>Turismo</span></span>
                </h2>

                {/* 3. MENÚ INTERACTIVO */}
                <nav style={{ display: 'flex', gap: '25px', fontSize: '15px', color: '#333', fontWeight: '600', alignItems: 'center' }}>
                    <span
                        onClick={() => setVistaActiva('inicio')}
                        style={{
                            cursor: 'pointer',
                            background: vistaActiva === 'inicio' ? '#5d7d65' : 'transparent',
                            color: vistaActiva === 'inicio' ? '#fff' : '#333',
                            padding: '8px 20px',
                            borderRadius: '8px',
                            transition: 'all 0.2s'
                        }}
                    >
                        Inicio
                    </span>
                    <span
                        onClick={() => setVistaActiva('mapa')}
                        style={{
                            cursor: 'pointer',
                            background: vistaActiva === 'mapa' ? '#5d7d65' : 'transparent',
                            color: vistaActiva === 'mapa' ? '#fff' : '#333',
                            padding: '8px 20px',
                            borderRadius: '8px',
                            transition: 'all 0.2s'
                        }}
                    >
                        Mapa
                    </span>
                    <span style={{ cursor: 'pointer' }}>Ayuda</span>
                </nav>
            </header>

            {/* 4. RENDERIZADO CONDICIONAL (INICIO VS MAPA) */}
            {vistaActiva === 'inicio' ? (
                <>
                    {/* HERO SECTION */}
                    <section style={{
                        position: 'relative',
                        overflow: 'hidden',
                        padding: '160px 20px 60px 20px',
                        textAlign: 'center',
                        borderBottomLeftRadius: '50% 10px',
                        borderBottomRightRadius: '50% 10px',
                        marginBottom: '30px'
                    }}>
                        {/* 1. IMAGEN DE FONDO CON BLUR */}
                        <div style={{
                            position: 'absolute',
                            top: '-10px',
                            left: '-10px',
                            right: '-10px',
                            bottom: '-10px',
                            backgroundImage: `url(${fondoTandil})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                            filter: 'blur(6px)',
                            zIndex: 0
                        }}></div>

                        {/* 2. CAPA OSCURA / OVERLAY (Le da contraste al texto y unifica el fondo) */}
                        <div style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: 'rgba(0, 0, 0, 0.35)', // Podes ajustar el 0.35 para que sea más claro u oscuro
                            zIndex: 1
                        }}></div>

                        {/* 3. CONTENIDO (Texto blanco y nítido, sin sombras raras) */}
                        <div style={{ position: 'relative', zIndex: 2 }}>
                            <h1 style={{
                                color: '#adddbd',
                                fontSize: '42px',
                                margin: '0 0 10px 0',
                                fontWeight: '800'
                            }}>
                                Bienvenido a Tandil
                            </h1>
                            <p style={{
                                color: '#f0f0f0',
                                fontSize: '18px',
                                margin: '0 0 40px 0',
                                fontWeight: '400'
                            }}>
                                Explorá lo mejor de nuestra ciudad
                            </p>

                            {/* Buscador */}
                            <div style={{
                                maxWidth: '600px',
                                margin: '0 auto',
                                background: '#fff',
                                borderRadius: '8px',
                                display: 'flex',
                                alignItems: 'center',
                                padding: '8px 8px 8px 15px',
                                boxShadow: '0 4px 15px rgba(0,0,0,0.15)'
                            }}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="11" cy="11" r="8"></circle>
                                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                                </svg>
                                <input
                                    type="text"
                                    value={busqueda}
                                    onChange={(e) => setBusqueda(e.target.value)}
                                    placeholder="¿A dónde vamos?"
                                    style={{ flex: 1, border: 'none', padding: '12px 15px', fontSize: '16px', outline: 'none', background: 'transparent' }}
                                />
                                <button style={{
                                    background: '#5d7d65',
                                    border: 'none',
                                    borderRadius: '6px',
                                    width: '45px',
                                    height: '45px',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    cursor: 'pointer',
                                    color: '#fff'
                                }}>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="5" y1="12" x2="19" y2="12"></line>
                                        <polyline points="12 5 19 12 12 19"></polyline>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </section>

                    {/* CATEGORÍAS */}
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', marginBottom: '50px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', color: '#1a3322', fontWeight: 'bold', fontSize: '16px' }}>Paseos</div>
                        <div style={{ width: '1px', background: '#ccc' }}></div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', color: '#1a3322', fontWeight: 'bold', fontSize: '16px' }}>Gastronomía</div>
                        <div style={{ width: '1px', background: '#ccc' }}></div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', color: '#1a3322', fontWeight: 'bold', fontSize: '16px' }}>Cultura</div>
                    </div>

                    {/* MAIN CONTENT (Tarjetas) */}
                    <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 20px' }}>
                        <h3 style={{ fontSize: '22px', color: '#1a3322', marginBottom: '20px' }}>Puntos Destacados</h3>

                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                            gap: '25px',
                            marginBottom: '50px'
                        }}>
                            {lugaresFiltrados.length > 0 ? (
                                lugaresFiltrados.map((lugar) => (
                                    <div key={lugar.id} style={{
                                        background: '#e6efe9',
                                        borderRadius: '8px',
                                        overflow: 'hidden',
                                        boxShadow: '0 4px 10px rgba(0,0,0,0.06)',
                                        display: 'flex',
                                        flexDirection: 'column'
                                    }}>
                                        <div style={{
                                            height: '160px',
                                            background: '#c4d7cd',
                                            backgroundImage: lugar.imagen ? `url(${lugar.imagen})` : 'none',
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center'
                                        }}></div>

                                        <div style={{ padding: '20px' }}>
                                            <h4 style={{ margin: '0 0 10px 0', fontSize: '18px', color: '#1a3322' }}>{lugar.nombre}</h4>
                                            <span style={{
                                                display: 'inline-block',
                                                background: '#6d8a74',
                                                color: '#fff',
                                                padding: '4px 10px',
                                                borderRadius: '4px',
                                                fontSize: '12px',
                                                fontWeight: 'bold',
                                                marginBottom: '12px'
                                            }}>
                                                {lugar.tipo}
                                            </span>
                                            <p style={{ margin: 0, fontSize: '14px', color: '#4a5b51', lineHeight: '1.5' }}>
                                                {lugar.descripcion}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p style={{ gridColumn: '1 / -1', textAlign: 'center', color: '#888', fontSize: '16px' }}>No se encontraron lugares.</p>
                            )}
                        </div>

                        {/* BOTÓN INSTALAR */}
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
                /* VISTA DEL MAPA */
                <div style={{ paddingTop: '100px' }}>
                    <CityMap />
                </div>
            )}
        </div>
    );
}

export default App;