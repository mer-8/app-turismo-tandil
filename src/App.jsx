import { useEffect, useState } from 'react';
import { lugaresTandil } from './data/tandilData'; // Asegurate de que esto exista
import './App.css';
import fondoTandil from './assets/fondoTandil.png';

function App() {
    const [busqueda, setBusqueda] = useState("");
    const [installPrompt, setInstallPrompt] = useState(null);

    useEffect(() => {
        const handleBeforeInstallPrompt = (event) => {
            event.preventDefault();
            setInstallPrompt(event);
        };

        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

        return () => {
            window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        };
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
        <div style={{ fontFamily: '"Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif', background: '#fafcfa', minHeight: '100vh', paddingBottom: '40px' }}>

            {/* 1. HEADER */}
            <header style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '20px 40px',
                position: 'absolute', // Para que quede sobre el fondo del hero
                top: 0,
                left: 0,
                right: 0,
                zIndex: 100,

                background: 'rgba(255, 255, 255, 0.45)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
            }}>
                <h2 style={{ margin: 0, color: '#1a3322', fontSize: '22px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    Tandil Turismo
                </h2>
                <nav style={{ display: 'flex', gap: '25px', fontSize: '15px', color: '#333', fontWeight: '600', alignItems: 'center' }}>
                    <span style={{ cursor: 'pointer', background: '#5d7d65', color: '#fff', padding: '8px 20px', borderRadius: '8px' }}>Inicio</span>
                    <span style={{ cursor: 'pointer' }}>Mapa</span>
                    <span style={{ cursor: 'pointer' }}>Ayuda</span>
                </nav>
            </header>

            {/* 2. HERO SECTION (Fondo, Título y Buscador) */}
            {/* Nota: Podés cambiar el 'background' por un backgroundImage con tu ilustración de las sierras */}
            <section style={{

                //BACKGROUND
                backgroundImage: `url(${fondoTandil})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',

                padding: '140px 20px 60px 20px',
                textAlign: 'center',
                borderBottomLeftRadius: '50% 10px',
                borderBottomRightRadius: '50% 10px',
                marginBottom: '30px'
            }}>
                <h1 style={{ color: '#1a3322', fontSize: '42px', margin: '0 0 10px 0' }}>Bienvenido a Tandil</h1>
                <p style={{ color: '#334a3b', fontSize: '18px', margin: '0 0 40px 0' }}>Explorá lo mejor de nuestra ciudad.</p>

                {/* Buscador */}
                <div style={{
                    maxWidth: '600px',
                    margin: '0 auto',
                    background: '#fff',
                    borderRadius: '8px', /* Antes 40px */
                    display: 'flex',
                    alignItems: 'center',
                    padding: '8px 8px 8px 15px',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.05)'
                }}>
                    {/* Lupa en SVG */}
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
                        borderRadius: '6px', /* Antes 50% */
                        width: '45px',
                        height: '45px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        cursor: 'pointer',
                        color: '#fff'
                    }}>
                        {/* Flecha en SVG */}
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                            <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                    </button>
                </div>
            </section>

            {/* 3. CATEGORÍAS */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', marginBottom: '50px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', color: '#1a3322', fontWeight: 'bold', fontSize: '16px' }}>
                    <span style={{ fontSize: '24px' }}></span> Paseos
                </div>
                <div style={{ width: '1px', background: '#ccc' }}></div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', color: '#1a3322', fontWeight: 'bold', fontSize: '16px' }}>
                    <span style={{ fontSize: '24px' }}></span> Gastronomía
                </div>
                <div style={{ width: '1px', background: '#ccc' }}></div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', color: '#1a3322', fontWeight: 'bold', fontSize: '16px' }}>
                    <span style={{ fontSize: '24px' }}></span> Cultura
                </div>
            </div>

            {/* 4. MAIN CONTENT (Tarjetas) */}
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
                                borderRadius: '8px', /* Antes 16px */
                                overflow: 'hidden',
                                boxShadow: '0 4px 10px rgba(0,0,0,0.06)',
                                display: 'flex',
                                flexDirection: 'column'
                            }}>
                                {/* Espacio para la imagen - Si tenés img en tandilData, cambialo por un tag <img src={lugar.imagen} /> */}
                                <div style={{
                                    height: '160px',
                                    background: '#c4d7cd', // Color placeholder si no hay foto
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

                {/* 5. BOTÓN INSTALAR */}
                <button
                    onClick={instalarApp}
                    style={{
                        maxWidth: '600px',
                        margin: '0 auto',
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

            </main>
        </div>
    );
}

export default App;