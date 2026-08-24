import { useState } from 'react';
import WidgetClima from './WidgetClima'; 

function Navbar({ 
    vistaActiva, 
    setVistaActiva, 
    cantidadFavoritos = 0 
}) {
    const [menuAbierto, setMenuAbierto] = useState(false);

    const cambiarVista = (vista) => {
        setVistaActiva(vista);
        setMenuAbierto(false); 
    };

    return (
        <header style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '16px 30px',
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 1000,
            background: 'rgba(239, 237, 230, 0.95)',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
            borderBottom: '1px solid #e2ded2'
        }}>
            {/* Logo y Clima agrupados a la izquierda */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <h2 
                    onClick={() => cambiarVista('inicio')} 
                    style={{ 
                        margin: 0, 
                        fontSize: '20px', 
                        fontWeight: '800', 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '10px', 
                        color: '#1a3322', 
                        cursor: 'pointer',
                        userSelect: 'none'
                    }}
                >
                    <span style={{ 
                        background: '#5d7d65', 
                        color: '#fff', 
                        padding: '7px', 
                        borderRadius: '10px', 
                        display: 'flex',
                        boxShadow: '0 2px 6px rgba(93,125,101,0.3)'
                    }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                            <circle cx="12" cy="10" r="3"></circle>
                        </svg>
                    </span>
                    <span>Tandil <span style={{ fontWeight: '400', color: '#5d7d65' }}>Turismo</span></span>
                </h2>

                {/* Widget del clima en tiempo real */}
                <div style={{ borderLeft: '2px solid #dcd8cd', paddingLeft: '12px', display: 'flex', alignItems: 'center' }}>
                    <WidgetClima />
                </div>
            </div>

            {/* Botón menú hamburguesa (para móviles) */}
            <div 
                onClick={() => setMenuAbierto(!menuAbierto)} 
                className="hamburger-btn"
                style={{ 
                    display: 'none', 
                    cursor: 'pointer', 
                    fontSize: '24px', 
                    color: '#1a3322', 
                    userSelect: 'none' 
                }}
            >
                {menuAbierto ? '✕' : '☰'}
            </div>

            {/* Menú de navegación principal limpio */}
            <nav className={`nav-menu ${menuAbierto ? 'activo' : ''}`} style={{ 
                display: 'flex', 
                gap: '8px', 
                fontSize: '14px', 
                color: '#333', 
                fontWeight: '700', 
                alignItems: 'center' 
            }}>
                <span 
                    onClick={() => cambiarVista('inicio')} 
                    style={{ 
                        cursor: 'pointer', 
                        background: vistaActiva === 'inicio' ? '#5d7d65' : 'transparent', 
                        color: vistaActiva === 'inicio' ? '#fff' : '#1a3322', 
                        padding: '7px 16px', 
                        borderRadius: '8px', 
                        transition: 'all 0.2s' 
                    }}
                >
                    Inicio
                </span>

                <span 
                    onClick={() => cambiarVista('eventos')} 
                    style={{ 
                        cursor: 'pointer', 
                        background: vistaActiva === 'eventos' ? '#5d7d65' : 'transparent', 
                        color: vistaActiva === 'eventos' ? '#fff' : '#1a3322', 
                        padding: '7px 16px', 
                        borderRadius: '8px', 
                        transition: 'all 0.2s' 
                    }}
                >
                    Eventos
                </span>

                <span 
                    onClick={() => cambiarVista('mapa')} 
                    style={{ 
                        cursor: 'pointer', 
                        background: vistaActiva === 'mapa' ? '#5d7d65' : 'transparent', 
                        color: vistaActiva === 'mapa' ? '#fff' : '#1a3322', 
                        padding: '7px 16px', 
                        borderRadius: '8px', 
                        transition: 'all 0.2s' 
                    }}
                >
                    Mapa
                </span>

                <span 
                    onClick={() => cambiarVista('favoritos')} 
                    style={{ 
                        cursor: 'pointer', 
                        background: vistaActiva === 'favoritos' ? '#5d7d65' : 'transparent', 
                        color: vistaActiva === 'favoritos' ? '#fff' : '#1a3322', 
                        padding: '7px 16px', 
                        borderRadius: '8px', 
                        transition: 'all 0.2s',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                    }}
                >
                    <span>Favoritos</span>
                    {cantidadFavoritos > 0 && (
                        <span style={{
                            background: vistaActiva === 'favoritos' ? '#ffffff' : '#c0392b',
                            color: vistaActiva === 'favoritos' ? '#1a3322' : '#ffffff',
                            fontSize: '11px',
                            fontWeight: '800',
                            padding: '2px 6px',
                            borderRadius: '10px'
                        }}>
                            {cantidadFavoritos}
                        </span>
                    )}
                </span>
            </nav>
        </header>
    );
}

export default Navbar;
