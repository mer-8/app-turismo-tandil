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

    return (
        <header style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '14px 30px',
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 1000,
            background: 'rgba(251, 247, 238, 0.92)',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 2px 16px rgba(30, 42, 32, 0.08)',
            borderBottom: '1px solid var(--sand-200)'
        }}>
            {/* Logo y Clima agrupados a la izquierda */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <div
                    onClick={() => cambiarVista('inicio')}
                    style={{ cursor: 'pointer', userSelect: 'none' }}
                >
                    <Logo size={38} />
                </div>

                {/* Widget del clima en tiempo real */}
                <div style={{ borderLeft: '2px solid var(--sand-200)', paddingLeft: '12px', display: 'flex', alignItems: 'center' }}>
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
                    color: 'var(--ink-900)',
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
                <span
                    onClick={() => cambiarVista('inicio')}
                    style={{
                        cursor: 'pointer',
                        background: vistaActiva === 'inicio' ? 'var(--forest-500)' : 'transparent',
                        color: vistaActiva === 'inicio' ? '#fff' : 'var(--ink-900)',
                        padding: '7px 16px',
                        borderRadius: 'var(--radius-pill)',
                        transition: 'all 0.2s'
                    }}
                >
                    Inicio
                </span>

                <span
                    onClick={() => cambiarVista('eventos')}
                    style={{
                        cursor: 'pointer',
                        background: vistaActiva === 'eventos' ? 'var(--forest-500)' : 'transparent',
                        color: vistaActiva === 'eventos' ? '#fff' : 'var(--ink-900)',
                        padding: '7px 16px',
                        borderRadius: 'var(--radius-pill)',
                        transition: 'all 0.2s'
                    }}
                >
                    Eventos
                </span>

                <span
                    onClick={() => cambiarVista('mapa')}
                    style={{
                        cursor: 'pointer',
                        background: vistaActiva === 'mapa' ? 'var(--forest-500)' : 'transparent',
                        color: vistaActiva === 'mapa' ? '#fff' : 'var(--ink-900)',
                        padding: '7px 16px',
                        borderRadius: 'var(--radius-pill)',
                        transition: 'all 0.2s'
                    }}
                >
                    Mapa
                </span>

                <span
                    onClick={() => cambiarVista('favoritos')}
                    style={{
                        cursor: 'pointer',
                        background: vistaActiva === 'favoritos' ? 'var(--forest-500)' : 'transparent',
                        color: vistaActiva === 'favoritos' ? '#fff' : 'var(--ink-900)',
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
                            background: vistaActiva === 'favoritos' ? '#ffffff' : 'var(--terracotta-600)',
                            color: vistaActiva === 'favoritos' ? 'var(--forest-700)' : '#ffffff',
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
