import { useState } from 'react';
import WidgetClima from './WidgetClima';
import Logo from './Logo';

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

    const itemsNav = [
        { key: 'inicio', label: 'Inicio' },
        { key: 'eventos', label: 'Eventos' },
        { key: 'mapa', label: 'Mapa' }
    ];

    return (
        <header style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '12px 30px',
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 1000,
            background: 'linear-gradient(120deg, var(--forest-900) 0%, var(--forest-700) 100%)',
            boxShadow: '0 4px 20px rgba(15, 26, 20, 0.35)',
            borderBottom: '3px solid var(--terracotta-600)'
        }}>
            {/* Logo y Clima agrupados a la izquierda */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <div
                    onClick={() => cambiarVista('inicio')}
                    style={{ cursor: 'pointer', userSelect: 'none' }}
                >
                    <Logo size={38} textColor="#ffffff" />
                </div>

                {/* Widget del clima en tiempo real */}
                <div style={{ borderLeft: '2px solid rgba(255,255,255,0.18)', paddingLeft: '12px', display: 'flex', alignItems: 'center' }}>
                    <WidgetClima color="var(--forest-100)" />
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
                    color: '#ffffff',
                    userSelect: 'none'
                }}
            >
                {menuAbierto ? '✕' : '☰'}
            </div>

            {/* Menú de navegación principal limpio */}
            <nav className={`nav-menu ${menuAbierto ? 'activo' : ''}`} style={{
                display: 'flex',
                gap: '6px',
                fontSize: '14px',
                fontWeight: '700',
                alignItems: 'center'
            }}>
                {itemsNav.map((item) => (
                    <span
                        key={item.key}
                        onClick={() => cambiarVista(item.key)}
                        style={{
                            cursor: 'pointer',
                            background: vistaActiva === item.key ? 'var(--terracotta-600)' : 'transparent',
                            color: vistaActiva === item.key ? '#fff' : 'var(--forest-100)',
                            padding: '7px 16px',
                            borderRadius: 'var(--radius-pill)',
                            transition: 'all 0.2s'
                        }}
                    >
                        {item.label}
                    </span>
                ))}

                <span
                    onClick={() => cambiarVista('favoritos')}
                    style={{
                        cursor: 'pointer',
                        background: vistaActiva === 'favoritos' ? 'var(--terracotta-600)' : 'transparent',
                        color: vistaActiva === 'favoritos' ? '#fff' : 'var(--forest-100)',
                        padding: '7px 16px',
                        borderRadius: 'var(--radius-pill)',
                        transition: 'all 0.2s',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                    }}
                >
                    <span>Favoritos</span>
                    {cantidadFavoritos > 0 && (
                        <span style={{
                            background: vistaActiva === 'favoritos' ? '#ffffff' : 'var(--gold-600)',
                            color: vistaActiva === 'favoritos' ? 'var(--terracotta-600)' : '#ffffff',
                            fontSize: '11px',
                            fontWeight: '800',
                            padding: '2px 6px',
                            borderRadius: 'var(--radius-pill)'
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
