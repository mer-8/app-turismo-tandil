import { useState } from 'react';
import WidgetClima from './WidgetClima'; 

function Navbar({ vistaActiva, setVistaActiva }) {
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
            padding: '20px 40px',
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 100,
            background: '#efede6',
            boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
        }}>
            {/* Logo y Clima agrupados a la izquierda */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <h2 onClick={() => cambiarVista('inicio')} style={{ margin: 0, fontSize: '22px', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '10px', color: '#1a3322', cursor: 'pointer' }}>
                    <span style={{ background: '#5d7d65', color: '#fff', padding: '6px', borderRadius: '8px', display: 'flex' }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                            <circle cx="12" cy="10" r="3"></circle>
                        </svg>
                    </span>
                    <span>Tandil <span style={{ fontWeight: '400', color: '#5d7d65' }}>Turismo</span></span>
                </h2>

                {/* El clima ahora vive acá, sutil al lado del título */}
                <div style={{ borderLeft: '2px solid #dcd8cd', paddingLeft: '15px', display: 'flex', alignItems: 'center' }}>
                    <WidgetClima />
                </div>
            </div>

            {/* Botón menú hamburguesa (para celulares) */}
            <div 
                onClick={() => setMenuAbierto(!menuAbierto)} 
                className="hamburger-btn"
                style={{ 
                    display: 'none', 
                    cursor: 'pointer', 
                    fontSize: '22px', 
                    color: '#1a3322', 
                    userSelect: 'none' 
                }}
            >
                {menuAbierto ? '✕' : '☰'}
            </div>

            {/* Menú de navegación principal */}
            <nav className={`nav-menu ${menuAbierto ? 'activo' : ''}`} style={{ 
                display: 'flex', gap: '25px', fontSize: '15px', color: '#333', fontWeight: '600', alignItems: 'center' 
            }}>
                <span onClick={() => cambiarVista('inicio')} style={{ cursor: 'pointer', background: vistaActiva === 'inicio' ? '#5d7d65' : 'transparent', color: vistaActiva === 'inicio' ? '#fff' : '#333', padding: '8px 20px', borderRadius: '8px', transition: 'all 0.2s' }}>
                    Inicio
                </span>
                <span onClick={() => cambiarVista('eventos')} style={{ cursor: 'pointer', background: vistaActiva === 'eventos' ? '#5d7d65' : 'transparent', color: vistaActiva === 'eventos' ? '#fff' : '#333', padding: '8px 20px', borderRadius: '8px', transition: 'all 0.2s' }}>
                    Eventos
                </span>
                <span onClick={() => cambiarVista('mapa')} style={{ cursor: 'pointer', background: vistaActiva === 'mapa' ? '#5d7d65' : 'transparent', color: vistaActiva === 'mapa' ? '#fff' : '#333', padding: '8px 20px', borderRadius: '8px', transition: 'all 0.2s' }}>
                    Mapa
                </span>
            </nav>
        </header>
    );
}

export default Navbar;